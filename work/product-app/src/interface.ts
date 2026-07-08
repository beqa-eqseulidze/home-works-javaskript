export interface IAuthPayload {
    email: string;
    password: string;
}

export interface IAuthResponse {
    accessToken: string;
}