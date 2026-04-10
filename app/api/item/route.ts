import { API_URL } from '@/app/lib/auth'
import { TItem } from '@/app/models/TItem'
import { TUser } from '@/app/models/TUser'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {

  const ITEM_USER: any = await request.json()
  const item: TItem = ITEM_USER[0]
  const user: TUser = ITEM_USER[1]

  if (!item.name) {
    return NextResponse.json(
      { error: 'Favor preencher todos os campos' },
      { status: 400 }
    )
  }

   if (!user.token) {
   return NextResponse.json(
  { error: 'Token não encontrado' },
  { status: 401 }
  )
  }
  
  const apiResponse = await fetch(`${API_URL}/item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`
    },
    body: JSON.stringify(item)
  })

    const data = await apiResponse.json()

 if (!apiResponse.ok) {
    return NextResponse.json(data, { status: apiResponse.status })
  }

  return NextResponse.json({ success: true, data })

};

export async function PUT(request: Request) {

  const ITEM_USER: any = await request.json()
  const item: TItem = ITEM_USER[0]
  const user: TUser = ITEM_USER[1]

  if (!item.id) {
    return NextResponse.json(
      { error: 'ID é obrigatório para atualização' },
      { status: 400 }
    )
  }

  if (!item.name) {
    return NextResponse.json(
      { error: 'Favor preencher todos os campos' },
      { status: 400 }
    )
  }

  if (!user.token) {
    return NextResponse.json(
      { error: 'Token não encontrado' },
      { status: 401 }
    )
  }

  const apiResponse = await fetch(`${API_URL}/item/${item.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`
    },
    body: JSON.stringify(item)
  })

  const data = await apiResponse.json()

 if (!apiResponse.ok) {
    return NextResponse.json(data, { status: apiResponse.status })
  }

  return NextResponse.json({ success: true, data })
}

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
    const response = await fetch(`${API_URL}/items`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
      cache: "no-store",
    })
    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao buscar Items" },
        { status: response.status }
      )
    }
    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error("Erro na API /items:", error)
    return NextResponse.json(
      { error: "Erro interno ao buscar dados" },
      { status: 500 }
    )
  }
}