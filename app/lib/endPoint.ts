import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { TUser } from "../models/TUser"

export async function endPoint(){
    const cookieStore = await cookies()
    const res = cookieStore.get("user")?.value as any
    const user: TUser= jwt.decode(res) as any
    const isAdmin = user?.role?.includes("ROLE_ADMIN")
    if (!user?.id && !isAdmin) return
    const endpoint = isAdmin ? "" : `?userId=${user.id}`
    return endpoint
}

export async function loadUSerLogin(){
    const cookieStore = await cookies()
    const res = cookieStore.get("user")?.value as any
    const user: TUser= jwt.decode(res) as any
    return user
}

export async function loadToken(){
    const cookieStore = await cookies()
    const res = cookieStore.get("token")?.value as any
    const token: TUser= jwt.decode(res) as any
    return token
}