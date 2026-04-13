import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export async function endPoint(){
    const cookieStore = await cookies()
    const res: any = cookieStore.get("user")?.value
    const user: any = jwt.decode(res)
    const isAdmin = user?.role?.includes("ROLE_ADMIN")
    if (!user?.id && !isAdmin) return
    const endpoint = isAdmin ? "" : `?userId=${user.id}`

    return endpoint
} 