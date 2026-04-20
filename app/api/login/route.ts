import { TLogin, TUser, UserRole } from '@/app/models/TUser'
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
    
    const login: TLogin = await request.json()

    if (!login?.login || !login?.password) {
      return NextResponse.json(
        { error: "Dados inválidos" },
        { status: 400 }
      )
    };

    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(login)
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      )
    };

    const apiUser: TAPIUser = await res.json();

    const payload: TUser = {
      id: apiUser.id,
      login: apiUser.login,
      role: apiUser.roles,
      token: apiUser.token
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1d"
    });

    const resp = NextResponse.json({ success: true });

    resp.cookies.set("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24
    });
    
    return resp;
  
  } catch (error) {
    return NextResponse.json(
      { error: "Erro no servidor" },
      { status: 500 }
    )
  }
}