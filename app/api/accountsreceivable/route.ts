
import { API_URL } from '@/app/lib/auth'
import { TAccountsReceivable } from '@/app/models/TAccountsReceivable'
import { TUser } from '@/app/models/TUser'
import { NextResponse } from 'next/server'

export async function PUT(request: Request) {
  const AR_USER: any = await request.json()
  const accountsreceivable: TAccountsReceivable = AR_USER[0]
  const user: TUser = AR_USER[1]
  // console.log(accountsreceivable)
  if (!accountsreceivable.id) {
    return NextResponse.json(
      { error: 'ID é obrigatório para atualização' },
      { status: 400 }
    )
  }
  if (accountsreceivable.balance <= 0) {
    return NextResponse.json(
      { error: 'Titulo ja está Quitado' },
      { status: 400 }
    )
  }
  if (!user.token) {
    return NextResponse.json(
      { error: 'Token não encontrado' },
      { status: 401 }
    )
  }
  const apiResponse = await fetch(`${API_URL}/account_receivable/${accountsreceivable.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`
    },
    body: JSON.stringify(accountsreceivable)
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
    const response = await fetch(`${API_URL}/accounts_receivable`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
      cache: "no-store",
    })
    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao buscar Titulos" },
        { status: response.status }
      )
    }
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Erro na API /accounts_receivable:", error)
    return NextResponse.json(
      { error: "Erro interno ao buscar dados" },
      { status: 500 }
    )
  }
}