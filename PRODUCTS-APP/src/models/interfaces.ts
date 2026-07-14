


export interface IUserInfo{
    accessToken:string
    user:IUser
}

interface IUser{
    email:string
    id:number
}

export interface IProduct{
    id:string
    title:string
    price:number
}