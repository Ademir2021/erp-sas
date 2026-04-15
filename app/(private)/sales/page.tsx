'use client'

import { loadHandle } from "@/app/lib/handleApi";
import { useRouter } from 'next/navigation'
import { TSaleResponse } from "@/app/models/TSale";
import { useEffect, useState } from "react";
import SalesForm from "@/app/components/Sales/SalesForm";
import { userAuth } from "@/app/lib/userAuth";

export default function Sales() {

    const router = useRouter()
    const { user } = userAuth()
    const [sales, setSales] = useState<TSaleResponse[]>([])

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