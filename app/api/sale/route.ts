import { API_URL } from '@/app/lib/auth'
import { loadToken } from '@/app/lib/endPoint'
import { TSale } from '@/app/models/TSale'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const sale: TSale = await request.json()
  const token = await loadToken()

  if (sale.person.id === 0) {
    return NextResponse.json(
      { error: 'Informe um Comprador' },
      { status: 400 }
    )
  }

  if (sale.itemsSale.length <= 0) {
    return NextResponse.json(
      { error: 'Sem items para gerar venda' },
      { status: 400 }
    )
  }

  if (!token.token) {
    return NextResponse.json(
      { error: 'Token não encontrado' },
      { status: 401 }
    )
  }

  const apiResponse = await fetch(`${API_URL}/sale`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.token}`
    },
    body: JSON.stringify(sale)
  })

  const data = await apiResponse.json()

  if (!apiResponse.ok) {
    return NextResponse.json(data, { status: apiResponse.status })
  }

  return NextResponse.json({ success: true, data })
}