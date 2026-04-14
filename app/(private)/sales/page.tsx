'use client'

import { getUser } from "@/app/lib/auth";
import { loadHandle } from "@/app/lib/handleApi";
import { useRouter } from 'next/navigation'
import { TSaleResponse } from "@/app/models/TSale";
import { TUser } from "@/app/models/TUser";
import { useEffect, useState } from "react";
import SalesForm from "@/app/components/Sales/SalesForm";

export default function Sales() {

    const router = useRouter()
    const [user, setUser] = useState<TUser | null>(null)
    const [sales, setSales] = useState<TSaleResponse[]>([])

    useEffect(() => {
        async function loadUser() {
            const user = await getUser()
            setUser(user)
        }
        loadUser()
    }, [])

    useEffect(() => {
        const token = user?.token as string
        loadHandle(token, setSales, 'sales', router)
    }, [user]);

    return <>
    <SalesForm
    sales={sales}
    />
    </>
}