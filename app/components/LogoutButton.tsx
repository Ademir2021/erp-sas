'use client'
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()

  async function logout() {
    await fetch('/api/logout', { method: 'POST' })
    router.push('/') // "/login"
    router.refresh()
  }

  return (
    <button className="font-semibold cursor-pointer"
    onClick={logout}>{ <LogoutIcon titleAccess='Sair' />}{" Sair"}</button>
  )

}