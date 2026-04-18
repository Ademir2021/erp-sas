'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TUser, UserRole } from '../models/TUser'
import LoginForm from '../components/login/LoginForm'
import { signIn } from "next-auth/react"

export default function LoginPage() {

  const router = useRouter()

  const [user, setUser] = useState<TUser>({
    login: '',
    password: '',
    role: UserRole.USER,
    token: ''
  })

  const [error, setError] = useState('')

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser(values => ({ ...values, [name]: value }))
  }

  async function handleLogin(e: React.FormEvent) {

    e.preventDefault()
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(user),
    })

    const resp = await res.json()

    if (!res.ok) {
      setError(`${resp.error}, Status: ${res.status}`)
      return
    }

      window.location.assign('dashboard')
      // router.push('dashboard')
      router.refresh()

  }



// async function handleLogin(e: React.FormEvent) {
//   e.preventDefault()

//   const result = await signIn("credentials", {
//     login: user.login,
//     password: user.password,
//     redirect: false,
//   })

//   if (result?.error) {
//     setError("Login inválido")
//     return // ✅ importante
//   }

//   // ✅ força atualização da sessão antes de navegar
//   router.refresh()

//   // pequena garantia (opcional, mas ajuda)
//   setTimeout(() => {
//     router.push("/dashboard")
//   }, 100)
// }

  return <>
    <LoginForm
      handleLogin={handleLogin}
      handleChange={handleChange}
      error={error as any}
    >
      {user}
    </LoginForm>
  </>
}