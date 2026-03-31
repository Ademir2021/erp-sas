import { NextResponse } from "next/server"

export async function GET(request: Request) {

    const URL = process.env.URL_PUBLICKEY_PAGSEGURO as string
    const token = process.env.TOKEN_PAGSEGURO;

    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ type: "card" }),
        });

        const data = await response.json();

        return NextResponse.json(data);
    } catch (err) {
        console.log("Error Occurred!", err);

        return NextResponse.json(
            { error: "Erro ao gerar public key" },
            { status: 500 }
        );
    }
}
