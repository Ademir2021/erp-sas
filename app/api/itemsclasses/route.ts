import { NextResponse } from "next/server"
import { API_URL } from "@/app/lib/auth"

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
        const response = await fetch(`${API_URL}/items_classes`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
            cache: "no-store",
        })
        if (!response.ok) {
            return NextResponse.json(
                { error: "Erro ao buscar Grupo de Tributação dos Items" },
                { status: response.status }
            )
        }
        const data = await response.json()
        return NextResponse.json(data)

    } catch (error) {
        console.error("Erro na API /items_classes:", error)
        return NextResponse.json(
            { error: "Erro interno ao buscar dados" },
            { status: 500 }
        )
    }
}