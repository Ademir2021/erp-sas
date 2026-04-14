import { API_URL } from '@/app/lib/auth'

import { NextResponse } from 'next/server'

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
       

        const response = await fetch(`${API_URL}/cash/list`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
            cache: "no-store",
        })

        if (!response.ok) {
            return NextResponse.json(
                { error: "Erro ao buscar Valores" },
                { status: response.status }
            )
        }

        const data = await response.json()
        return NextResponse.json(data)

    } catch (error) {
        console.error("Erro na API /cash/list:", error)
        return NextResponse.json(
            { error: "Erro interno ao buscar dados" },
            { status: 500 }
        )
    }
}