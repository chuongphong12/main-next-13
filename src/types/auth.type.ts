import { IUser } from "./user.type"

export interface ILogin {
    email: string
    password: string
}

export interface ILoginSNS {
    accessToken: string
}

export interface ILoginResponse {
    user: IUser
    access_token: string
    refresh_token: string
    error?: any
    message?: string
}

export interface ISignup {
    email: string
    password: string
    sessionId?: number | null,
    isReceiveEventEmail?: boolean;
    isReceiveEventPhone?: boolean;
}
