'use client'
import Link from "next/link"
import Logo from "./Logo"
import { userAuth } from "../lib/userAuth"
import { LogoutButton } from "./LogoutButton"


type Props = {
  session: any
}
export default function MenuHeader({ session }: Props) {

  const { user } = userAuth();

  return <>
    <header className="w-full z-50 bg-gray-900 text-white shadow-md px-4 md:px-8 py-2">

      <div className="flex items-center justify-between">

        {/* Logo */}
        <Logo />

        {/* Usuário / Ações */}
        {session && <div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-xs text-gray-300">Bem-vindo</p>
              <p className="text-sm font-semibold truncate max-w[120px]">
                {session.user?.name}
              </p>
            </div>

            <img
              className="w-9 h-9 rounded-full border-2 border-blue-500 object-cover"
              alt="Avatar"
              src={session.user?.image || ""}
            />
          </div>
        </div>}
        {user ? <LogoutButton /> :
          <Link className="font-bold text-sm" href={"/login"}>
            Login
          </Link>}
      </div>
    </header>
  </>
}