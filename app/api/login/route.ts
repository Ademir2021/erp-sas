import { TUser, UserRole } from '@/app/models/TUser'
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { API_URL } from '@/app/lib/auth'

type TAPIUser = {
  id: number
  login: string
  password: string
  token: string
  roles: UserRole
}

export async function POST(request: Request) {
  try {

    const user: TUser = await request.json()

    if (!user?.login || !user?.password) {
      return NextResponse.json(
        { error: "Dados inválidos" },
        { status: 400 }
      )
    }

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

    const apiUser: TAPIUser = await apiResponse.json();

    const payload: TUser = {
      id: apiUser.id,
      login: apiUser.login,
      role: apiUser.roles,
      token: apiUser.token
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1d"
    })

    const response = NextResponse.json({ success: true })

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24
    })
    
    return response

  } catch (error) {
    return NextResponse.json(
      { error: "Erro no servidor" },
      { status: 500 }
    )
  }
}