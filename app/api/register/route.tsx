import { TUser } from '@/app/models/TUser'
import { NextResponse } from 'next/server'

// export async function POST(request: Request) {
//   const user:TUser =  await request.json()
// console.log(user)
//   // Fake validação
//   if (user.login === "") {
//     return NextResponse.json(
//       { error: 'Favor preencher todos os campos' },
//       { status: 401 }
//     )
//   }

//   const response = NextResponse.json({ success: true })

//   response.cookies.set('token', 'abc123', {
//     httpOnly: true,
//     path: '/register',
//     maxAge: 60 * 60 * 24, // 1 dia
//   })
//   console.log(user)
//   return response
// }

export async function POST(request: Request) {
  const user: TUser = await request.json()

  if (!user.login || !user.password) {
    return NextResponse.json(
      { error: 'Favor preencher todos os campos' },
      { status: 400 }
    )
  }

  try {
    const apiResponse = await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    if (!apiResponse.ok) {
      const error = await apiResponse.text()
      return NextResponse.json({ error }, { status: 400 })
    }

    return NextResponse.json({ success: true })

  } catch (err) {
    return NextResponse.json(
      { error: 'Erro ao conectar com o servidor' },
      { status: 500 }
    )
  }
}