import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const pagSeguroPix = await req.json();
  // console.log(pagSeguroPix)

  const URL = process.env.URL_PAGSEGURO_SANDBOX_ORDERS as string

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TOKEN_PAGSEGURO_SANDBOX}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pagSeguroPix),
    });

    const data = await response.json();
    console.log("Resposta do PagSeguro:", data);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao processar pagamento", },
      { status: 500 }
    );
  }
}