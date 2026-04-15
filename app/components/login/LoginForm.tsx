'use client'

import { signIn } from "next-auth/react"
import { TUser } from "@/app/models/TUser"
import Link from "next/link"

type Props = {
    children: TUser
    handleLogin: any
    handleChange: any
    error: string
}

export default function LoginForm({
    children,
    handleLogin,
    handleChange,
    error }: Props) {
    return <>
        <div className="min-h-screen flex items-center justify-center bg-gray-100v text-gray-100">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-6">
                    Login
                </h1>
                <form onSubmit={handleLogin} className="space-y-4 ">
                    <input
                        type="email"
                        name='login'
                        placeholder="Email"
                        value={children.login}
                        required
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Senha"
                        value={children.password}
                        required
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 cursor-pointer"
                    >
                        Entrar
                    </button>
                </form>
                {error && (
                    <p className="mt-4 text-sm text-red-600 text-center">
                        {error}
                    </p>
                )}
                <Link className="text-gray-300 pe-2" href={'/register'}>Registrar-seu Login</Link>
                <div className="min-h-screenxx flex items-center justify-center p-3">
                    <button
                        onClick={() => signIn("github", { callbackUrl: '/dashboard' })}
                        className="bg-black text-white px-6 py-3 rounded-lg cursor-pointer"
                    >Entrar com GitHub</button>
                </div>
                <div className="min-h-screenxx flex items-center justify-center p-3">
                    <button
                        onClick={() => signIn("google", { callbackUrl: '/dashboard' })}
                        className="bg-black text-white px-6 py-3 rounded-lg cursor-pointer"
                    >Entrar com google</button>
                </div>
                <p className="text-end"><Link href='/' >Sair</Link></p>
            </div>
        </div>
    </>
}