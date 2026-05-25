'use client'

import { loadHandle } from "@/app/lib/handleApi";
import { useRouter } from 'next/navigation'
import { TSale, TSaleResponse } from "@/app/models/TSale";
import { useEffect, useState } from "react";
import SalesForm from "@/app/components/Sales/SalesForm";
import { userAuth } from "@/app/lib/userAuth";
import { TResponseMessage } from "@/app/models/TMessage";

export default function Sales() {

    const router = useRouter()
    const { user } = userAuth()
    const [msg, setMsg] = useState("")
    const [sales, setSales] = useState<TSaleResponse[]>([])

    useEffect(() => {
        const token = user?.token as string
        loadHandle(token, setSales, 'sales', router)
    }, [user]);

     async function cancelSale(sale: TSale) {
            const res = await fetch('/api/cancelsale', {
                method: 'PUT',
                body: JSON.stringify(sale),
            })
            const resp: TResponseMessage = await res.json()
    
            if (!res.ok) {
                setMsg(`Erro ao Cancelar Nota: ${resp.error}`)
                return
            }
            router.push('/sales')
            setMsg(`${resp.data.message} ID: ${resp.data.id} : ${resp.success}`)
            router.refresh()
        }

    return <>
        <SalesForm
            sales={sales}
            cancelSale={cancelSale}
            msg={msg}
            setMsg={setMsg}
        />
    </>
}