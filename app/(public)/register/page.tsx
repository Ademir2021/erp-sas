'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation'
import RegisterLoginForm from "@/app/components/login/RegisterLoginForm";
import { TUser, UserRole } from "@/app/models/TUser";

export default function Register() {

    const router = useRouter()

     const [, setLoading] = useState(false);

    const [msg, setMsg] = useState('')
    const [user, setUser] = useState<TUser>({
        login: '',
        password: '',
        role: UserRole.USER
    })

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(values => ({ ...values, [name]: value }))
    }

    async function handleSubmit(e: Event) {
        e.preventDefault()
        setLoading(true)
        setMsg("")
         try{
        const res = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(user),
        })

        const resp = await res.json()

        if (!res.ok) {
            setMsg(`Erro: ${resp.error}`)
            return
        }
        router.push('/register')
        setMsg('Usuário registrado com sucesso')
        router.refresh()
         } catch {
      setMsg("Erro no servidor");
    } finally {
      setLoading(false);
    }
    }

    return <>
    {/* <p>{JSON.stringify(user)}</p> */}
        <RegisterLoginForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            msg={msg}
        >
            {user}
        </RegisterLoginForm>
    </>
}