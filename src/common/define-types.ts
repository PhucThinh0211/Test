import {AnyAction} from '@reduxjs/toolkit';
import {Epic} from 'redux-observable';
import {RootState} from '../store/reducers';

export type RootEpic = Epic<AnyAction, AnyAction, RootState>;
export interface SystemConfig {
    hostIdentity: string;
}
export interface User {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: Date;
    updatedAt: Date;
    role: RoleData;
    phone: null | number;
    fullName: string;
}
export interface UserData {
    userOrgId: string
    organizationRoles: string[]
    id: string
    invitationStatus: string
    userName: string
    email: string
    phoneNumber: string | null
    firstname: string
    lastname: string
    gender: string | null
    avatarUrl: string | null
    profile: any
    forcePasswordChange: boolean
  }
export interface ForgotType {
    email: string;
}
export interface UserResponse {
    amr: string[];
    aud: string;
    auth_time: number;
    client_id: string;
    exp: number;
    iat: number;
    idp: string;
    iss: string;
    nbf: number;
    profile: User;
    role: string;
    scope: string[];
    sub: string;
    orgRoles: string;
}

export interface ResponseToken {
    error: string;
    jwt: string,
    user: User
}

export interface Token_ResponseToken {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
    scope?: string
}
export interface LoginInfo {
    username: string;
    password: string;
    captchaId?: string;
    captcha?: string;
    remember: boolean;
}

export interface IOrganization {
    orgid: string;
    orgdesc: string;
    orgidParent: string | null;
    orgord: number | null;
    isccsl: number | null;
    orgcode: string;
    active: number;
    orlevel: number;
    listChild: any;
}

export interface ReqInfo {
    maGn: string;
    thang: number;
    nam: number;
    userid: string;
}

export interface OrgReq {
    orgId?: string|null;
    thang?: number|null;
    nam?: number|null;
    rid?: number|null;
}

export interface ErrorResponse {
    message?: string;
    status?: string;
    data?: any;
}

interface IDetailDataValue {
    label?: string | null;
    value?: string | null | number;
}

export interface ITitleAndDetailData {
    title?: string | null;
    data?: IDetailDataValue[] | null;
}

export interface ItemData {
    id?: number | null | string;
    name: string | null;
    detail?: ITitleAndDetailData[] | null;
}
export interface DataSource {
    id?: number | null | string;
    name?: string | null;
    children?: ItemData[] | null;
    detail?: ITitleAndDetailData[] | null;
}
export interface Profile {
    createdAt:string|null;
    updatedAt:string|null;
    userid:string|null,
    orgid:string|null,
    email:string|null,
    username:string|null,
    password:string|null,
    enable:boolean|null,
    roles:{id:string|null,
    role:string|null}[],
    organizations:any[],
    tel:string|null,
    desript:string|null,
    groupUserId:string|null,
    urlDefault:string|null,
    expiration:number|null,
    enabled:boolean|null,
    accountNonLocked:boolean|null,
    authorities:{authority:string|null}[],
    accountNonExpired:boolean|null,
    credentialsNonExpired:boolean|null,
    emailVerified:boolean|null
}

export interface RoleData  {
    id: 1,
    name: string,
    description: string,
    type: string,
    createdAt: Date,
    updatedAt: Date,
    nb_users: number
}


