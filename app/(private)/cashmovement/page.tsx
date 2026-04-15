'use client'

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { TCashMovement } from "@/app/models/TCashMovement"
import { TUser } from "@/app/models/TUser"
import { getUser } from "@/app/lib/auth"
import { loadHandle } from "@/app/lib/handleApi"
import CashmovementForm from "@/app/components/Cashmovement/CashmovementForm"
import { userAuth } from "@/app/lib/userAuth"

export default function CashMovement() {

    const router = useRouter()
    const { user } = userAuth()
    const [cashmovements, setCashmovements] = useState<TCashMovement[]>([])

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