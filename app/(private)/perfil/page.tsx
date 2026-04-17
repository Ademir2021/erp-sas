'use client'

import { userAuth } from "@/app/lib/userAuth"

export default function Perfil() {

    const { user } = userAuth() as any;
    return (
        <main className="p-6 text-white">
            
            <h1 className="text-2xl font-bold mb-4">Perfil</h1>

            {user && (
                <div className="bg-gray-800 p-4 rounded space-y-3">
                    <p><strong>ID:</strong> {String(user?.id).padStart(4, '0')}</p>
                    <p><strong>Login:</strong> {user?.login}</p>
                    <p><strong>Email:</strong> {user?.login}</p>
                    <p><strong>Perfis:</strong> {user?.role?.join(" . ")}</p>

                    <div className="pt-3 flex gap-2">
                        <button className="bg-blue-600 px-3 py-1 rounded">
                            Editar
                        </button>
                        <button className="bg-red-600 px-3 py-1 rounded">
                            Sair
                        </button>
                    </div>
                </div>
            )}
        </main>
    )
}