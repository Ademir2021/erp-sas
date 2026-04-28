import { NextResponse } from "next/server"
import { API_URL } from "@/app/lib/auth"
import { loadToken } from '@/app/lib/endPoint'
import { TOperationSale } from "@/app/models/TSale"


export async function POST(request: Request) {
    const token = await loadToken()
    const operation: TOperationSale = await request.json()

    if (!operation.description) {
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
    const apiResponse = await fetch(`${API_URL}/operationsale`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`
        },
        body: JSON.stringify(operation)
    })
    const data = await apiResponse.json()
    if (!apiResponse.ok) {
        return NextResponse.json(data, { status: apiResponse.status })
    }
    return NextResponse.json({ success: true })
};

export async function PUT(request: Request) {
    const token = await loadToken()
    const operation: TOperationSale = await request.json()

    if (!operation.id) {
        return NextResponse.json(
            { error: 'ID é obrigatório para atualização' },
            { status: 400 }
        )
    }
    if (!operation.description) {
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
    const apiResponse = await fetch(`${API_URL}/operationsale/${operation.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`
        },
        body: JSON.stringify(operation)
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
        const response = await fetch(`${API_URL}/operationsales`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
            cache: "no-store",
        })
        if (!response.ok) {
            return NextResponse.json(
                { error: "Erro ao buscar Operações de Venda" },
                { status: response.status }
            )
        }
        const data = await response.json()
        return NextResponse.json(data)

    } catch (error) {
        console.error("Erro na API /operationsales:", error)
        return NextResponse.json(
            { error: "Erro interno ao buscar dados" },
            { status: 500 }
        )
    }
}