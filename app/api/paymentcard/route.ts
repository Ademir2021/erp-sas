import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const pagSeguroCard = await request.json();
  console.log("PagSeguro Card:", pagSeguroCard);
  /* produção: URL_PAGSEGURO_ORDERS || homologação: URL_PAGSEGURO_SANDBOX_ORDERS
  producao: TOKEN_PAGSEGURO || homologação: TOKEN_PAGSEGURO_SANDBOX */
  const URL = process.env.URL_PAGSEGURO_SANDBOX_ORDERS as string
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TOKEN_PAGSEGURO_SANDBOX}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pagSeguroCard)
    });
    const data = await response.json();
    console.log("Response Data:", data);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao processar pagamento", },
      { status: 500 }
    );
  }
}