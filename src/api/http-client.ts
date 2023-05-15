import Utils from '../common/Utils';
import {throwError} from 'rxjs';
import {ajax, AjaxError, AjaxResponse} from 'rxjs/ajax';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, map, retry} from 'rxjs/operators';

/** types */
interface ParamRequest {
    method?: string;
    async?: boolean;
    headers?: Readonly<Record<string, any>>;
    timeout?: number;
    crossDomain?: boolean;
    withCredentials?: boolean;
    responseType?: XMLHttpRequestResponseType;
}
type PartAjaxRequest = Omit<ParamRequest, 'url' | 'method' | 'body'>;
type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT';
interface Param {
    url: string;
    data?: unknown;
    headers?: PartAjaxRequest;
}

function mapResponse(res: AjaxResponse<any>) {
    console.log(JSON.stringify(res.response));
    if (res.response) {
        return res.response;
    }
}
function mapResponseHeader(res: AjaxResponse<any>) {
    if (res.response) {
        return res;
    }
}
function handleError$(err: AjaxError): Observable<AjaxError> {
    console.log(err.message);
    if(err.status === 401){
        Utils.clear();
    }
    return throwError(() => err);
}

function mapAjaxRequest(request?: PartAjaxRequest) {
    const mapHeaders = request?.headers
        ? ({...request.headers} as PartAjaxRequest)
        : undefined;
    const newHeaders = {
        Authorization: Utils.token ? `Bearer ${Utils.token}` : '',
        Accept: '*/*',
        'Content-Type': 'application/json',
        ...mapHeaders,
    };
    return {...request, headers: {...newHeaders}};
}

function commonApiCall(
    method: HttpMethod,
    param: Param,
    isGetHeader = false,
): Observable<unknown> {
    const {url, data, headers} = param;
    console.log('------------------');
    console.log(url);
    data && console.log(JSON.stringify(data));
    console.log('------------------');
    const newHeaders = mapAjaxRequest(headers);
    const body = data;
    return ajax({url, method, body, ...newHeaders}).pipe(
        map((res: AjaxResponse<any>) =>
            !isGetHeader ? mapResponse(res) : mapResponseHeader(res),
        ),
        catchError(err => {
            console.log('------------------');
            console.log(url);
            data && console.log(JSON.stringify(data));
            console.log('------------------');
            return handleError$(err);
        }),
    );
}

/** base class */
export default class HttpClient {
    static get(url: string, headers?: PartAjaxRequest): Observable<unknown> {
        return commonApiCall('GET', {url, headers});
    }

    static post(
        url: string,
        data: unknown,
        headers?: PartAjaxRequest,
        isGetHeader?: boolean,
    ): Observable<unknown> {
        return commonApiCall('POST', {url, data, headers}, isGetHeader);
    }

    static delete(
        url: string,
        data?: unknown,
        headers?: PartAjaxRequest,
    ): Observable<unknown> {
        return commonApiCall('DELETE', {url, data, headers});
    }

    static put(
        url: string,
        data: unknown,
        headers?: PartAjaxRequest,
    ): Observable<unknown> {
        return commonApiCall('PUT', {url, data, headers});
    }
    static upload(
        url: string,
        data: unknown,
        _headers?: PartAjaxRequest,
    ): Observable<unknown> {
        console.log('------------------');
        console.log(url);
        data && console.log(JSON.stringify(data));
        console.log('------------------');
        return ajax({
            url,
            method: 'POST',
            body: data,
            headers: {
                Authorization: Utils.token ? `Bearer ${Utils.token}` : '',
            },
        }).pipe(
            map((response: AjaxResponse<any>) => mapResponse(response)),
            retry(2),
            catchError(err => handleError$(err)),
        );
    }
}

export const ajaxErrorFlashMessage = (error: any) => {
    const message =
        typeof error === 'string'
            ? error
            : (error.response &&
                  error.response.error &&
                  error.response.error.message) ||
              error.message;
    // showMessage({
    //     message: 'Oops!',
    //     description: message,
    //     type: 'danger',
    // });
};
