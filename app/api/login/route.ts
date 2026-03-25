import { TUser, UserRole } from '@/app/models/TUser'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { API_URL }  from '@/app/lib/auth'

type TapiUSer = {
  id:number
  login:string
  password:string
  token:string
  roles:UserRole
}

export async function POST(request: Request) {

  const user: TUser = await request.json()

  // chama API REST
  const apiResponse = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })

  if (!apiResponse.ok) {
    return NextResponse.json(
      { error: "Credenciais inválidas" },
      { status: 401 }
    )
  }

  const apiUser:TapiUSer = await apiResponse.json()
  
  // dados que irão no token
  const payload: TUser = {
    id: apiUser.id,
    login: apiUser.login,
    role: apiUser.roles,
    token: apiUser.token
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1d"
  })

  const response = NextResponse.json({ success: true })

  response.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24
  })

  return response
}