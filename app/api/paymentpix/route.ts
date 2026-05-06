import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const pagSeguroPix = await req.json();
  // console.log(pagSeguroPix)
  /* produção: URL_PAGSEGURO_ORDERS || homologação: URL_PAGSEGURO_SANDBOX_ORDERS
  producao: TOKEN_PAGSEGURO || homologação: TOKEN_PAGSEGURO_SANDBOX */
  const URL = process.env.URL_PAGSEGURO_ORDERS as string
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TOKEN_PAGSEGURO}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pagSeguroPix),
    });
    const data = await response.json();
    // console.log(data)
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao processar pagamento", },
      { status: 500 }
    );
  }
}