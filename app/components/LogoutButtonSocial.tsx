'use client'
import { signOut } from "next-auth/react"

export function LogoutButtonSocial() {
  return <>
    <button className="cursor-pointer" onClick={() => signOut()}>
      Sair Git
    </button>
  </>
}