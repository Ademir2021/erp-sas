'use client'

import { globalStyles_form } from "@/app/components/GlobalStyles";
import { userAuth } from "@/app/lib/userAuth"

export default function Perfil() {

    const { user } = userAuth() as any;
    return (
        <main className={`${globalStyles_form}`} >
            <h1 className="text-2xl font-bold">Perfil do Usuário</h1>
         <div className="my-8 h-px bg-gray-800 from-transparent via-zinc-500 to-transparent" />
            {user && (
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 shadow-xl max-w-xl mx-auto">
    <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold text-white">
            {user?.login?.charAt(0)?.toUpperCase()}
        </div>

        <div>
            <h2 className="text-xl font-bold text-white">
                {user?.login}
            </h2>
            <p className="text-zinc-400 text-sm">
                Usuário do Sistema
            </p>
        </div>
    </div>

    <div className="space-y-3 text-sm">
        <div className="flex justify-between border-b border-zinc-700 pb-2">
            <span className="text-zinc-400">ID</span>
            <span className="font-semibold text-white">
                {String(user?.id).padStart(4, "0")}
            </span>
        </div>

        <div className="flex justify-between border-b border-zinc-700 pb-2">
            <span className="text-zinc-400">Login</span>
            <span className="font-semibold text-white">
                {user?.login}
            </span>
        </div>

        <div className="flex justify-between border-b border-zinc-700 pb-2">
            <span className="text-zinc-400">Email</span>
            <span className="font-semibold text-white">
                {user?.login}
            </span>
        </div>

        <div className="flex justify-between items-center">
            <span className="text-zinc-400">Perfis</span>

            <div className="flex flex-wrap gap-2">
                {user?.role?.map((role: string) => (
                    <span
                        key={role}
                        className="px-2 py-1 text-xs font-semibold bg-blue-600/20 text-blue-400 rounded-full"
                    >
                        {role}
                    </span>
                ))}
            </div>
        </div>
    </div>

    <div className="pt-6 flex gap-3">
        <button
            className="flex-1 bg-blue-600 hover:bg-blue-700 transition rounded-lg py-2 font-semibold"
        >
            ✏️ Editar
        </button>

        <button
            className="flex-1 bg-red-600 hover:bg-red-700 transition rounded-lg py-2 font-semibold"
        >
            🚪 Sair
        </button>
    </div>
</div>
            )}
        </main>
    )
}