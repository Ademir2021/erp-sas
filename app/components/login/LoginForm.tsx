
import { TLogin } from "@/app/models/TUser"
import Link from "next/link"
import Logo from "../Logo"
import { globalStyles_login_btn, globalStyles_login_div, globalStyles_login_div_hight, globalStyles_login_div_left, globalStyles_login_input, globalStyles_login_main } from "../GlobalStyles"

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
        <div className={`${globalStyles_login_div}`}>
            <main className={`${globalStyles_login_main}`}>
                {/* Lateral Esquerdo*/}
                <div className={`${globalStyles_login_div_left}`}>
                    <div className="text-center text-blue-400"><Logo /></div>
                    <p className="font-normal  text-lg ml-12">Entre com sua Conta!</p>
                    <span className="text-center">Gerencie a gestão de sua Empresa com a <br />
                        segurança que só o ERP-SAS te oferece.</span>
                </div>

                <div className={`${globalStyles_login_div_hight}`}>
                    <p className="flex justify-center text-gray-300 font-bold text-2xl p-1 mb-6">Sign in.</p>
                    <form onSubmit={handleLogin} className="space-y-4 ">
                        <input
                            type="email"
                            name='login'
                            placeholder="Email"
                            value={children.login}
                            required
                            onChange={handleChange}
                            className={`${globalStyles_login_input}`}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Senha"
                            value={children.password}
                            required
                            onChange={handleChange}
                            className={`${globalStyles_login_input}`}
                        />
                        {(error || msg) && (<p className={`text-sm text-center
                ${error ? "text-red-600" : "text-blue-700"}`}>
                            {error || msg}</p>
                        )}
                        <button type="submit"
                            className={`${globalStyles_login_btn}`}>
                            Entrar</button>
                    </form>

                    <Link className="text-start" href={'/register'}>Registrar-seu Login</Link>
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
            </main>
        </div>
    )
}