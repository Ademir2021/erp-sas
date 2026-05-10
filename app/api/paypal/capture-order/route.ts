import { NextResponse } from "next/server";
import { generateAccessToken } from "../../../lib/paypal";

export async function POST(req: Request) {
    const { orderID } = await req.json();
    const accessToken = await generateAccessToken();
    const response = await fetch(
        `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    const data = await response.json();
    return NextResponse.json(data);
}