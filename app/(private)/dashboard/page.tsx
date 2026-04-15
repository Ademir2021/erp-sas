'use client'

import { userAuth } from "@/app/lib/userAuth"
import Link from "next/link"

export default  function Dashboard() {
    const { user } = userAuth()

  return <>
    {/* <pre>{JSON.stringify(user)}</pre> */}
    <h1>Dashboard</h1>
    {user ? <p>Bem Vindo: <span>{user?.login}</span></p>:
    <p>Olá, favor efetuar login para este acesso : <Link className="text-blue-700" href={'/login'}>Logar</Link></p>}
    </>
}