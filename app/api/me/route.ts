import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { TUser } from "@/app/models/TUser"

export async function GET() {

  const cookieStore = await cookies()

  const token = cookieStore.get("token")?.value

  if (!token) {
    return NextResponse.json({ user: null })
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as TUser

    return NextResponse.json({
      user: decoded
    })

  } catch {
    return NextResponse.json({ user: null })
  }
}