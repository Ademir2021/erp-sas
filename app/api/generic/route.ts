import { API_URL } from '@/app/lib/auth'
import { loadToken } from '@/app/lib/endPoint'
import { TGeneric } from '@/app/models/TGeneric'

import { NextResponse } from 'next/server'

export async function POST(request: Request) {

    const generic: TGeneric = await request.json()
    console.log(generic)
    const token = await loadToken();

    const { searchParams } = new URL(request.url)
    const genericDefined = searchParams.get("name")
    const url_generic = genericDefined?.slice(0, -1)

    if (!generic.name) {
        return NextResponse.json(
            { error: 'Favor preencher todos os campos' },
            { status: 400 }
        )
    }

    if (!token.token) {
        return NextResponse.json(
            { error: 'Token não encontrado' },
            { status: 401 }
        )
    }

    const apiResponse = await fetch(`${API_URL}/${url_generic}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`
        },
        body: JSON.stringify(generic)
    })

    const data = await apiResponse.json()

    if (!apiResponse.ok) {
        return NextResponse.json(data, { status: apiResponse.status })
    }

    return NextResponse.json({ success: true, data })

};

export async function PUT(request: Request) {

    const { searchParams } = new URL(request.url)
    const genericDefined = searchParams.get("name")
    const url_generic = genericDefined?.slice(0, -1)

    const generic: TGeneric = await request.json()
    console.log(generic)

    const token = await loadToken();

    if (!generic.id) {
        return NextResponse.json(
            { error: 'ID é obrigatório para atualização' },
            { status: 400 }
        )
    }

    if (!generic.name) {
        return NextResponse.json(
            { error: 'Favor preencher todos os campos' },
            { status: 400 }
        )
    }

    if (!token.token) {
        return NextResponse.json(
            { error: 'Token não encontrado' },
            { status: 401 }
        )
    }

    const apiResponse = await fetch(`${API_URL}/${url_generic}/${generic.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`
        },
        body: JSON.stringify(generic)
    })

    const data = await apiResponse.json()

    if (!apiResponse.ok) {
        return NextResponse.json(data, { status: apiResponse.status })
    }

    return NextResponse.json({ success: true, data })
}


//Sem uso
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
        const response = await fetch(`${API_URL}/generics`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
            cache: "no-store",
        })
        if (!response.ok) {
            return NextResponse.json(
                { error: "Erro ao buscar generics" },
                { status: response.status }
            )
        }
        const data = await response.json()
        return NextResponse.json(data)

    } catch (error) {
        console.error("Erro na API /generics:", error)
        return NextResponse.json(
            { error: "Erro interno ao buscar dados" },
            { status: 500 }
        )
    }
}