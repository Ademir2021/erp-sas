'use client'

import Link from "next/link"
import Logo from "./Logo"
import { LogoutButton } from "./LogoutButton"
import { userAuth } from "../lib/userAuth"


export default function MenuHeader() {

  const { user } = userAuth() as any

  return (
          <header className="flex fixed items-center justify-between
    w-full z-50 bg-gray-800 text-white
    shadow-md px-4 md:px-8 py-2">

      <Logo />

      {user ? <p><LogoutButton /></p> :
        <Link className="font-bold text-sm" href={"/login"}>
          Login
        </Link>}
    </header>
  )
  
}