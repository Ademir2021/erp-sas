'use client'

import { userAuth } from "@/app/lib/userAuth";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

export default function Dashboard() {

  const router = useRouter()
  const { user } = userAuth();
  const userRole = user?.role || "Sem Perfil" as any

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      {user ? <>
        <div className="mb-4 rounded-xl border border-gray-800
  bg-gradient-to-2 from-black to-gray-900 p-4 shadow-md">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-sm text-gray-400">
                Bem-vindo
              </p>
              <h2 className="text-lg font-bold text-white">
                {user.login}
              </h2>
              <p className="text-sm text-gray-300 mt-1">
                Perfil:
                <span className="ml-2 inline-block rounded-md bg-gray-800 px-2 py-1 text-xs font-semibold text-cyan-400">
                  {userRole.join(" • ")}
                </span>
              </p>
            <button
              className='cursor-pointer mt-16 text-blue-400 hover:text-blue-600'
              onClick={() => router.push("/person")}
            >
              <AppRegistrationIcon
              fontSize='large'
              titleAccess="Registrar Dados"
              />
            </button>
            <span className="m-12 text-gray-500" > {" | "} <a className="text-blue-400 hover:text-blue-600"
             title="centroserra@gmail.com"
             href="http://malito:centroserra@gmail.com">Fale conosco.</a></span>
            </div>
          </div>
        </div>
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