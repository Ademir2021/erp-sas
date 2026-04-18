'use client'
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation'
import { signOut } from "next-auth/react";
export function LogoutButton() {
  const router = useRouter()

  async function logout() {
    await fetch('/api/logout', { method: 'POST' })
    // router.push('/') // ou "/login"
    // router.refresh()
   signOut({ callbackUrl: "/" });
  }

  return (
    <button className="font-semibold cursor-pointer"
    onClick={logout}>{ <LogoutIcon titleAccess='Sair' />}{" Sair"}</button>
  )
}