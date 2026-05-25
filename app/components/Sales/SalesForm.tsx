import { TSaleResponse } from "@/app/models/TSale"
import SalesList from "./SalesList"
import { useEffect } from "react"

type Props = {
    sales: TSaleResponse[]
    cancelSale: Function
    msg: string
    setMsg:Function
}

export default function SalesForm({ sales, cancelSale, msg, setMsg }: Props) {

    useEffect(() => {
    if (msg) {
        const timer = setTimeout(() => {
            setMsg('');
        }, 4000);
        return () => clearTimeout(timer);
    }
}, [msg]);

    return <>
        <p>Vendas</p>
        {msg && (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
        <div className="
            bg-gray-300 text-red-600
            px-8 py-5 rounded-2xl
            shadow-2xl text-xl font-bold
        ">
            {msg}
        </div>
    </div>
)}
        <SalesList
            sales={sales}
            cancelSale={cancelSale}
        />
    </>
}