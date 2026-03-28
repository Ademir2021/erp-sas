import { NextResponse } from "next/server"

export async function GET(request: Request) {

    const urlPublicKey = "https://api.pagseguro.com/public-keys";
    const token = process.env.AUTH_PAGSEGURO;

    try {
        const reqs = await fetch(urlPublicKey, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ type: "card" }),
        });

        const public_key = await reqs.json();

        return NextResponse.json(public_key);
    } catch (err) {
        console.log("Error Occurred!", err);

        return NextResponse.json(
            { error: "Erro ao gerar public key" },
            { status: 500 }
        );
    }
}
