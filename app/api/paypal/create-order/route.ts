import { NextResponse } from "next/server";
import { generateAccessToken } from "../../../lib/paypal";

export async function POST(req: Request) {

    const body = await req.json();

    const accessToken = await generateAccessToken();

    const response = await fetch(
        `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(body)
        }
    );

    const data = await response.json();
    
    console.log("Response body:", data);

    return NextResponse.json(data);
}