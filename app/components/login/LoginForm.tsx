'use client'

import { TLogin } from "@/app/models/TUser"
import Link from "next/link"

type Props = {
    children: TLogin
    handleLogin: any
    handleChange: any
    error: string
    msg: string
}

export default function LoginForm({
    children,
    handleLogin,
    handleChange,
    error, msg }: Props) {
    return (
    
        <div className="flex min-h-screen bg-transparent items-center justify-center text-gray-100">
            <div className="w-full max-w-md bg-black/60 p-8 rounded-2xl shadow-lg">
                <p className="flex justify-center text-gray-300 font-bold text-2xl p-1 mb-6">Sign in.</p>
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

                {(error || msg) && (<p className={`mt-4 text-sm text-center
                ${error ? "text-red-600" : "text-blue-700"}`}>
                    {error || msg}</p>
                )}
                <Link className="text-gray-300 pe-2" href={'/register'}>Registrar-seu Login</Link>
                {/* <div className="min-h-screenxx flex items-center justify-center p-3">
                    <button
                        onClick={() => signIn("github", { callbackUrl: '/dashboard' })}
                        className="bg-black text-white px-6 py-3 rounded-lg cursor-pointer"
                    >Entrar com GitHub</button>
                </div> */}
                {/* <div className="min-h-screenxx flex items-center justify-center p-3">
                    <button
                        onClick={() => signIn("google", { callbackUrl: '/dashboard' })}
                        className="bg-black text-white px-6 py-3 rounded-lg cursor-pointer"
                    >Entrar com google</button>
                </div> */}
                <p className="text-end"><Link href='/' >Sair</Link></p>
            </div>
        </div>
    )
}