'use client'
import Link from "next/link"
import Logo from "./Logo"
import { userAuth } from "../lib/userAuth"
import { LogoutButton } from "./LogoutButton"


type Props = {
  session: any
}

export default function MenuHeader({ session }: Props) {
  const { user } = userAuth()
  return <>
  <header className="flex-1 top-0 left-0 w-full z-50 bg-gray-900 text-white shadow-md px-8 py-2 mt-1">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Logo />
        <div className="flex items-center justify-end gap-3">
          {session ? <>
            <div className="text-right">
              <p className="text-xs md:text-sm text-gray-300">Bem-vindo</p>
              <p className="text-sm md:text-base font-semibold">
                {session.user?.name}
              </p>
            </div>
            <img
              className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-blue-500 object-cover"
              alt="Avatar"
              src={session.user?.image || ""}
            />
          </>
            : !user ? <Link className="font-bold" href={"/login"}>Fazer Login</Link> : <LogoutButton />}
        </div>
      </div>
    </header>
  </>
}