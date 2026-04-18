'use client'

import { userAuth } from "@/app/lib/userAuth";
import Link from "next/link";


export default function Dashboard() {

  const { user } = userAuth();

  const userRole = user?.role || "Sem Perfil" as any

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>

      {user ? <>
        <p>
          Bem-vindo: <span className="font-semibold">{user.login}</span>
        </p>
        <p>
          Perfil: <span className="font-semibold">{userRole.join(" , ")}</span>
        </p>
      </> : (
        <p>
          Olá, favor efetuar login para acessar:{" "}
          <Link className="text-blue-500 hover:underline" href="/login">
            Logar
          </Link>
        </p>
      )}
    </div>
  );
}