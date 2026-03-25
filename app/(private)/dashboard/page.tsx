'use client'

import { TUser } from "@/app/models/TUser";
import { useEffect, useState } from "react";
import { getUser } from "@/app/lib/auth";
import Link from "next/link"

export default  function Dashboard() {

  const [user, setUser] = useState<TUser | null>(null)
      useEffect(() => {
          async function loadUser() {
              const user = await getUser()
              setUser(user)
          }
          loadUser()
      }, [])

  return <>
    {/* <pre>{JSON.stringify(user)}</pre> */}
    <h1>Dashboard</h1>
    {user ? <p>Bem Vindo: <span>{user?.login}</span></p>:
    <p>Olá, favor efetuar login para este acesso : <Link className="text-blue-700" href={'/login'}>Logar</Link></p>}
    </>
}