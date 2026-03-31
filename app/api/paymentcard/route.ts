import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const pagSeguroCard = await req.json();

  const URL = process.env.URL_PAGSEGURO_ORDERS as string
  
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TOKEN_PAGSEGURO}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pagSeguroCard)
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao processar pagamento", },
      { status: 500 }
    );
  }
}