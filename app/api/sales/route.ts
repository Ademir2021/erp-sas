// import jwt from "jsonwebtoken"
// import { cookies } from "next/headers"
import { API_URL } from '@/app/lib/auth'
import { endPoint } from '@/app/lib/Endpoint'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
try {

const authHeader = request.headers.get("authorization")
if (!authHeader) {
    return NextResponse.json(
        { error: "Token não informado" },
        { status: 401 }
    )
}
const token = authHeader.replace("Bearer ", "")

// const cookieStore = await cookies()
// const user_: any = cookieStore.get("user")?.value
// const user: any = jwt.decode(user_)
// const isAdmin = user?.role?.includes("ROLE_ADMIN")
// if (!user?.id && !isAdmin) return
// const endpoint = isAdmin ? "" : `?userId=${user.id}`

const endpoint = await endPoint();

const response = await fetch(`${API_URL}/sales${endpoint}`, {
method: "GET",
headers: {
Authorization: `Bearer ${token}`
},
cache: "no-store",
})

if (!response.ok) {
return NextResponse.json(
{ error: "Erro ao buscar Vendas" },
{ status: response.status }
)
}

const data = await response.json()
return NextResponse.json(data)

} catch (error) {
console.error("Erro na API /sales:", error)
return NextResponse.json(
{ error: "Erro interno ao buscar dados" },
{ status: 500 }
)
}
}