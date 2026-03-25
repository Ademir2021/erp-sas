export type TUser = {
    id?:number
    login:string | any
    password?:string
    roles:UserRole
    token:string
}

export enum UserRole  {
    ADMIN = "ROLE_ADMIN",
    USER ="ROLE_USER"
 }

export type TUserGithub = {
    user:{
        name:string
        image:string
    }
}