export type TUser = {
    id?:number
    login:string | any
    password?:string
    role:UserRole
    token?:string
}

export enum UserRole  {
    ADMIN = "ADMIN",
    USER ="USER"
 }

export type TUserGithub = {
    user:{
        name:string
        image:string
    }
}

export type TLogin = {
    login:string
    password:string
}