import { NextResponse } from "next/server";
import { API_URL } from "@/app/lib/auth";

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
