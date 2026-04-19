'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TUser, UserRole } from '../models/TUser'
import LoginForm from '../components/login/LoginForm'
import { signIn } from "next-auth/react"

export default function LoginPage() {

  const router = useRouter()

  const [, setLoading] = useState(false);

  const [user, setUser] = useState<TUser>({
    login: '',
    password: '',
    role: UserRole.USER,
    token: ''
  })

  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser(values => ({ ...values, [name]: value }))
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true);
    setError("");
    setMsg("")
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(user),
      })

      const resp = await res.json()

      if (!res.ok) {
        setError(`${resp.error}, Status: ${res.status}`)
        return
      }

      if (res.ok === true)
        setMsg(`${res.ok}: Seu acesso iniciará em 5 segundos`)
      setTimeout(() => {
        window.location.assign('dashboard')
        // router.push('dashboard')
        // router.refresh()
      }, 5000)

    } catch {
      setError("Erro no servidor");
    } finally {
      setLoading(false);
    }

  }

  async function sigIn(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true);
    setError("");
    try {
      const res = await signIn("credentials", {
        login: user.login,
        password: user.password,
        redirect: false,
      });

      if (res?.error === "INVALID_CREDENTIALS") {
        setError("Usuário ou senha incorretos");
        return
      }
      else if (res?.error) {
        setError("Erro ao fazer login");
        return
      }

      router.refresh()
      router.push("/about");
    } catch {
      setError("Erro no servidor");
    } finally {
      setLoading(false);
    }
  }

  return <>
    <LoginForm
      handleLogin={!sigIn || handleLogin}
      handleChange={handleChange}
      error={error as any}
      msg={msg}
    >
      {user}
    </LoginForm>
  </>
}