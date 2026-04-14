'use client'

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { TCashMovement } from "@/app/models/TCashMovement"
import { TUser } from "@/app/models/TUser"
import { getUser } from "@/app/lib/auth"
import { loadHandle } from "@/app/lib/handleApi"
import CashmovementForm from "@/app/components/Cashmovement/CashmovementForm"

export default function CashMovement() {

    const router = useRouter()
    const [user, setUser] = useState<TUser | null>(null)
    const [cashmovements, setCashmovements] = useState<TCashMovement[]>([])

    useEffect(() => {
        async function loadUser() {
            const user = await getUser()
            setUser(user)
        }
        loadUser()
    }, [])

    useEffect(() => {
        const token = user?.token as string
        loadHandle(token, setCashmovements, 'cashmovements', router)
    }, [user]);

    return <>
    <CashmovementForm
    cashmovements={cashmovements}
    />
    </>
}