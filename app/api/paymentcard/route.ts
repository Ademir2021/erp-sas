import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const pagSeguroCard = await req.json();
  // console.log(pagSeguroCard)

  const url_pagSeguro = 'https://api.pagseguro.com/orders'
  // const url_pagSeguro_ = 'https://api.pagseguro.com/charges' 
  // const url_sandbox = "https://sandbox.api.pagseguro.com/orders"
 
  try {
    const response = await fetch(url_pagSeguro, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.AUTH_PAGSEGURO}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pagSeguroCard)
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