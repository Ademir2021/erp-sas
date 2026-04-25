import { API_URL } from '@/app/lib/auth'
import { loadToken } from '@/app/lib/endPoint'
import { TGeneric } from '@/app/models/TGeneric'
import { NextResponse } from 'next/server'

/**POST Generics */
export async function POST(request: Request) {
    const generic: TGeneric = await request.json();
    const token = await loadToken();
    const { searchParams } = new URL(request.url);
    const genericDefined = searchParams.get("name");
    const url_generic = genericDefined?.slice(0, -1);
    if (!generic.name) {
        return NextResponse.json(
            { error: 'Favor preencher todos os campos' },
            { status: 400 })
    };
    if (!token.token) {
        return NextResponse.json(
            { error: 'Token não encontrado' },
            { status: 401 })
    };
    const apiResponse = await fetch(`${API_URL}/${url_generic}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`
        },
        body: JSON.stringify(generic)
    });
    const data = await apiResponse.json();
    if (!apiResponse.ok) {
        return NextResponse.json(data, { status: apiResponse.status })
    };
    return NextResponse.json({ success: true, data })
};

/**PUT Generics */
export async function PUT(request: Request) {
    const generic: TGeneric = await request.json();
    const token = await loadToken();
    const { searchParams } = new URL(request.url);
    const genericDefined = searchParams.get("name");
    const url_generic = genericDefined?.slice(0, -1);
    if (!generic.id) {
        return NextResponse.json(
            { error: 'ID é obrigatório para atualização' },
            { status: 400 })
    };
    if (!generic.name) {
        return NextResponse.json(
            { error: 'Favor preencher todos os campos' },
            { status: 400 })
    };
    if (!token.token) {
        return NextResponse.json(
            { error: 'Token não encontrado' },
            { status: 401 })
    };
    const apiResponse = await fetch(`${API_URL}/${url_generic}/${generic.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`
        },
        body: JSON.stringify(generic)
    });
    const data = await apiResponse.json();
    if (!apiResponse.ok) {
        return NextResponse.json(data, { status: apiResponse.status })
    };
    return NextResponse.json({ success: true, data })
}