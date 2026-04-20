'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TLogin, TUser, UserRole } from '../../models/TUser'
import LoginForm from '../../components/login/LoginForm'
import { signIn } from "next-auth/react"

export default function LoginPage() {

  const router = useRouter()
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const [, setLoading] = useState(false);
  const [login, setLogin] = useState<TLogin>({
    login: '',
    password: ''
  })

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setLogin(values => ({ ...values, [name]: value }))
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true);
    setError("");
    setMsg("")
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(login),
      })

      const resp = await res.json()

      if (!res.ok) {
        setError(`${resp.error}, Status: ${res.status}`)
        return
      }

      if (res.ok === true)
        setMsg(`${res.ok}: Seu acesso iniciará em 5 segundos`)
      setTimeout(() => {
        window.location.assign('/dashboard');
        // router.push('/dashboard')
        // router.refresh()
      }, 3000)

    } catch {
      setError("Erro no servidor");
    } finally {
      setLoading(false);
    }

  }

  async function signIn_(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true);
    setError("");
    try {
      const res = await signIn("credentials", {
        login: login.login,
        password: login.password,
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
      handleLogin={!signIn_ || handleLogin}
      handleChange={handleChange}
      error={error as any}
      msg={msg}
    >
      {login}
    </LoginForm>
  </>
}