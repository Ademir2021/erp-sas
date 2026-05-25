import { API_URL } from '@/app/lib/auth'
import { loadToken } from '@/app/lib/endPoint'
import { TSale } from '@/app/models/TSale'
import { NextResponse } from 'next/server'

export async function PUT(request: Request) {
    const token = await loadToken()
    const sale: TSale = await request.json()

    const sale_ = { id: sale.id }

    if (!sale.id) {
        return NextResponse.json(
            { error: 'ID é obrigatório para atualização' },
            { status: 400 }
        )
    }

    if (!token.token) {
        return NextResponse.json(
            { error: 'Token não encontrado' },
            { status: 401 }
        )
    }
    const apiResponse = await fetch(`${API_URL}/sale/${sale.id}/cancel`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`
        },
        body: JSON.stringify(sale_)
    })
    const data = await apiResponse.json()
    if (!apiResponse.ok) {
        return NextResponse.json(data, { status: apiResponse.status })
    }
    return NextResponse.json({ success: true, data })
};