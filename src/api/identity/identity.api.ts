import SYSTEM_CONSTANTS from '../../common/constants';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import HttpClient from '../http-client';
import {ResponseToken} from '../../common/define-types';
import {AjaxError} from 'rxjs/ajax';
export default class IdentityApi {
    static host = SYSTEM_CONSTANTS.IDENTITY.HOST;
    static login(body: {identifier: string, password: string}): Observable<ResponseToken | null> {
        const api = `${IdentityApi.host}/${SYSTEM_CONSTANTS.IDENTITY.LOGIN}`;
        return HttpClient.post(api, body, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        }).pipe(
            map(
                res => (res as ResponseToken) || null,
                catchError((e: AjaxError) => throwError(e)),
            ),
        );
    }

    static forgotPassword(email: string): Observable<any | null> {
        const api = `${IdentityApi.host}/${SYSTEM_CONSTANTS.IDENTITY.FORGOT}/${email}/notify/passwordreset`;
        return HttpClient.post(api, {}).pipe(
            map(
                res => (res as any) || null,
                catchError((e: AjaxError) => throwError(e)),
            ),
        );
    }
    static getProfile(): Observable<any> {
        const api = `${IdentityApi.host}/${SYSTEM_CONSTANTS.IDENTITY.PROFILE}`;
        return HttpClient.get(api, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        }).pipe(map(res => res));
    }
    static getRole(): Observable<any> {
        const api = `${IdentityApi.host}/${SYSTEM_CONSTANTS.IDENTITY.ROLE}`;
        return HttpClient.get(api, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        }).pipe(map(res => res));
    }
}
