
import {Action, createSlice, PayloadAction} from '@reduxjs/toolkit';
import Utils from '../../common/Utils';
import {filter, switchMap, mergeMap, catchError, map, of, OperatorFunction} from 'rxjs';
import jwt from 'jwt-decode';
import {
    LoginInfo,
    Profile,
    ResponseToken,
    RoleData,
    RootEpic,
    Token_ResponseToken,
    User,
    UserResponse,
} from '../../common/define-types';
import IdentityApi from '../../api/identity/identity.api';
import {now} from 'moment';
import {addSeconds} from 'date-fns';
import {AjaxError} from 'rxjs/ajax';

type MessageLogin = {
    content: string;
    errorCode?: number;
    error?: any;
};
type MessageForgot = {
    ErrorCode?: number;
    Message: string;
};
interface LoginState {
    loading: boolean;
    isSuccess: boolean;
    user: User | undefined;
    message: MessageLogin | undefined;
    messageForgot: MessageForgot | undefined;
    departmentId: number;
    refresh_token: string;
    profile: Profile | null;
    role: RoleData | null;
}

const initState: LoginState = {
    loading: false,
    isSuccess: false,
    user: undefined,
    departmentId: 1,
    message: undefined,
    messageForgot: undefined,
    refresh_token: '',
    profile: null,
    role: null,
};

const loginSlice = createSlice({
    name: 'login',
    initialState: initState,
    reducers: {
        loginRequest(state, action: PayloadAction<LoginInfo>) {
            state.loading = true;
        },
        loginSuccess(
            state,
            action: PayloadAction<{
                user: any;
                token: Token_ResponseToken;
                remember: boolean;
            }>,
        ) {
            if (action.payload.remember) {
                Utils.token = action.payload.token.access_token;
                Utils.setLocalStorage(Utils.constant.token, action.payload.token);
                Utils.setLocalStorage(Utils.constant.username, action.payload.user.username);
                Utils.setLocalStorage(Utils.constant.email, action.payload.user.email);
                Utils.setLocalStorage(Utils.constant.user, action.payload.user);
            } else {
                //Utils.clear();
                //Utils.setLocalStorage('token', action.payload.token);
                Utils.token = action.payload.token.access_token;
            }
            state.user = action.payload.user;
            state.loading = false;
            state.isSuccess = true;
        },
        getInfoUser(state, action: PayloadAction<User | null>) {
            if (action.payload) {
                state.user = action.payload;
                state.role = action.payload.role;
            }
        },
        forgotRequest(state, action: PayloadAction<string>) {
            state.loading = true;
        },
        sendMailSuccess(state, action: PayloadAction<{message: MessageLogin}>) {
            state.message = action.payload.message;
            state.loading = false;
            state.isSuccess = true;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setLoginSuccess(state, action: PayloadAction<{status: boolean; token: string; user: User}>) {
            state.isSuccess = action.payload.status;
            Utils.token = action.payload.token;
            state.user = action.payload.user;
            state.loading = false;
           
        },
        message(state, action: PayloadAction<MessageLogin>) {
            state.message = action.payload;
            state.loading = false;
        },
        messageForgot(state, action: PayloadAction<MessageForgot>) {
            state.messageForgot = action.payload;
            state.loading = false;
        },
        clearMessageRequests(state) {
            state.loading = true;
        },
        clearMessage(state) {
            state.messageForgot = undefined;
            state.message = undefined;
            state.loading = false;
        },
        logout(state) {
            state.messageForgot = undefined;
            state.message = undefined;
            state.loading = false;
            state.user = undefined;
            state.isSuccess = false;
            Utils.clear();
        },
        getRoles: (state, action: PayloadAction<void>) => {
            state.loading = true;
        },
        getRoleSuccess: (
            state,
            action: PayloadAction<{role: RoleData}>,
        ) => {
            state.loading = false;
            state.role = action.payload.role;
            Utils.role = action.payload.role;
        },
    },
});

const login$: RootEpic = (action$) =>
    action$.pipe(
        filter(loginRequest.match),
        switchMap((re) => {
            return IdentityApi.login({
                username: re.payload.username,
                password: re.payload.password,
                CaptchaId: re.payload.captchaId ?? '',
                Captcha: re.payload.captcha ?? '',
                scope: 'offline_access API',
                grant_type: 'password',
                client_id: 'DMS'
            }).pipe(
                mergeMap((res: any) => {
                    if (res && !res?.response?.error) {
                        const newRes = res as Token_ResponseToken;
                        const token = newRes.access_token;
                        const userRes: UserResponse = jwt(token);
                        Utils.token = token;

                        return [
                            loginSlice.actions.loginSuccess({
                                user: userRes,
                                token: newRes,
                                remember: re.payload.remember,
                            }),
                        ];
                    } else {
                        return [
                            loginSlice.actions.message({
                                content: res?.response.error,
                                error: res,
                            }),
                        ];
                    }
                }),
                catchError((e: AjaxError) => [
                    loginSlice.actions.message({
                        content:
                            e?.response?.error_description ??
                            'Tên đăng nhập hoặc mật khẩu không đúng',
                        error: e,
                    }),
                ]),
            );
        }),
    );

const forgot$: RootEpic = (action$: { pipe: (arg0: OperatorFunction<Action<unknown>, { payload: string; type: "login/forgotRequest"; }>, arg1: OperatorFunction<unknown, { payload: MessageForgot; type: "login/messageForgot"; }>) => any; }) =>
    action$.pipe(
        filter(forgotRequest.match),
        switchMap((re: any) => {
            return IdentityApi.forgotPassword(re.payload).pipe(
                map(() => {
                    return loginSlice.actions.messageForgot({
                        Message: 'success',
                    });
                }),
                catchError(err => [
                    loginSlice.actions.messageForgot(err.response),
                ]),
            );
        }),
    );
const clearMessage$: RootEpic = (action$: { pipe: (arg0: OperatorFunction<Action<unknown>, { payload: undefined; type: "login/clearMessageRequests"; }>, arg1: OperatorFunction<unknown, { payload: undefined; type: "login/clearMessage"; }>) => any; }) =>
    action$.pipe(
        filter(clearMessageResquest.match),
        map(() => {
            return loginSlice.actions.clearMessage();
        }),
    );
const getRoles$: RootEpic = (action$) =>
    action$.pipe(
        filter(getRoles.match),
        switchMap(re => {
            return IdentityApi.getProfile().pipe(
                mergeMap((profile: any) => {
                    return [
                        loginSlice.actions.getInfoUser(profile),
                    ];
                }),
                catchError((e: AjaxError) => [
                    loginSlice.actions.getInfoUser(null),
                ]),
            );
        }),
    );
export const LoginEpics = [login$, getRoles$, forgot$, clearMessage$];
export const {
    loginRequest,
    forgotRequest,
    clearMessageRequests: clearMessageResquest,
    getInfoUser,
    logout,
    getRoles,
    setLoginSuccess
} = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
