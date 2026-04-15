'use client'
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from "next-auth/react"

export function LogoutButtonSocial() {
  return (
    <button className="cursor-pointer" onClick={() => signOut()}>
      { <LogoutIcon titleAccess='Sair' />}{" Sair ( Login Social )"}
    </button>
  )
}