import { NextRequest, NextResponse } from "next/server";
import { API_URL } from "@/app/lib/auth";
import { cookies } from "next/headers";
import { loadToken } from "@/app/lib/endPoint";

export async function GET(request: Request) {
    try {
        const response = await fetch(`${API_URL}/images`, {
            method: "GET",
            cache: "no-store",
        });
        if (!response.ok) {
            return NextResponse.json(
                { error: "Erro ao buscar images" },
                { status: response.status },
            );
        }
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Erro na API /images:", error);

        return NextResponse.json(
            { error: "Erro interno ao buscar dados" },
            { status: 500 },
        );
    }
}

export async function DELETE(request: Request) {

    try {
        
        const { id } = await request.json()
        const { token } = await loadToken()

        const response = await fetch(
            `${process.env.API_URL}/item/image/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            return NextResponse.json(
                { message: "Erro ao excluir imagem." },
                { status: response.status }
            );
        }

        return NextResponse.json({
            message: "Imagem excluída com sucesso!"
        });

    } catch (error) {
        return NextResponse.json(
            { message: "Erro interno ao excluir imagem." },
            { status: 500 }
        );
    }
}