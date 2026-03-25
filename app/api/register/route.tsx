import { TUser } from '@/app/models/TUser'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const user:TUser =  await request.json()

  // Fake validação
  if (user.login === "") {
    return NextResponse.json(
      { error: 'Favor preencher todos os campos' },
      { status: 401 }
    )
  }

  const response = NextResponse.json({ success: true })

  response.cookies.set('token', 'abc123', {
    httpOnly: true,
    path: '/register',
    maxAge: 60 * 60 * 24, // 1 dia
  })
  console.log(user)
  return response
}