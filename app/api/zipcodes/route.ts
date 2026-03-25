import { NextResponse } from "next/server"
import { API_URL } from "@/app/lib/auth"

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/zipcodes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // evita cache no Next.js
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao buscar CEPs" },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Erro na API /zipcodes:", error)
    return NextResponse.json(
      { error: "Erro interno ao buscar dados" },
      { status: 500 }
    )
  }
}