import { API_URL } from '@/app/lib/auth'
import { TUser } from '@/app/models/TUser'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {

  const user: TUser = await request.json()

  if (!user.login || !user.password) {
    return NextResponse.json(
      { error: 'Favor preencher todos os campos.' },
      { status: user.login == "" ? 422 : 400 }
    )
  };

  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      // const error = await res.text()
      return NextResponse.json(
        { error:'Erro no servidor ou Usuário já existe.' }, 
        { status: 500 })
    };
  
    return NextResponse.json({ success: true });

  } catch (err) {
    return NextResponse.json(
      { error: "Erro no servidor ou Usuário já existe."},
      { status: 500 }
    )
  }
}