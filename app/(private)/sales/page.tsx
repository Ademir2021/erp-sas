'use client'

import { getUser } from "@/app/lib/auth";
import { loadHandle } from "@/app/lib/handleApi";
import { useRouter } from 'next/navigation'
import { TSale } from "@/app/models/TSale";
import { TUser } from "@/app/models/TUser";
import { useEffect, useState } from "react";

export default function Sales() {

    const router = useRouter()
    const [user, setUser] = useState<TUser | null>(null)
    const [sales, setSales] = useState<TSale[]>([])

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
        <p>Sales</p>
        <div>{JSON.stringify(sales)}</div>
    </>
}