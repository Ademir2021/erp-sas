import { API_URL } from '@/app/lib/auth'
import { TPerson } from '@/app/models/TPerson'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {

  const person: TPerson = await request.json()

  if (!person.name) {
    return NextResponse.json(
      { error: 'Favor preencher todos os campos' },
      { status: 400 }
    )
  }

  if (!person.user?.token) {
    return NextResponse.json(
      { error: 'Token não encontrado' },
      { status: 401 }
    )
  }

  const apiResponse = await fetch(`${API_URL}/person`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${person.user.token}`
    },
    body: JSON.stringify(person)
  })

  const data = await apiResponse.json()

  if (!apiResponse.ok) {
    return NextResponse.json(data, { status: apiResponse.status })
  }

  return NextResponse.json({ success: true })
};

export async function PUT(request: Request) {

  const person: TPerson = await request.json()

  if (!person.id) {
    return NextResponse.json(
      { error: 'ID é obrigatório para atualização' },
      { status: 400 }
    )
  }

  if (!person.name) {
    return NextResponse.json(
      { error: 'Favor preencher todos os campos' },
      { status: 400 }
    )
  }

  if (!person.user.token) {
    return NextResponse.json(
      { error: 'Token não encontrado' },
      { status: 401 }
    )
  }

  const apiResponse = await fetch(`${API_URL}/person/${person.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${person.user.token}`
    },
    body: JSON.stringify(person)
  })

  const data = await apiResponse.json()

  if (!apiResponse.ok) {
    return NextResponse.json(data, { status: apiResponse.status })
  }

  return NextResponse.json({ success: true, data })
};

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
    const response = await fetch(`${API_URL}/persons`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
      cache: "no-store",
    })
    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao buscar Pessoas" },
        { status: response.status }
      )
    }
    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error("Erro na API /persons:", error)
    return NextResponse.json(
      { error: "Erro interno ao buscar dados" },
      { status: 500 }
    )
  }
}