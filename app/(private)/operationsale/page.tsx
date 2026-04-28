'use client'
import OperationSaleForm from "@/app/components/OperationSale/OperationSaleForm";
import { loadHandle } from "@/app/lib/handleApi";
import { userAuth } from "@/app/lib/userAuth";
import { TOperationSale } from "@/app/models/TSale";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";


export default function OperationSale() {

    const router = useRouter()
    const { user } = userAuth();
    const [operationSales, setOperationSales] = useState<TOperationSale[]>([])
    const [operationSale, setOperationSale] = useState<TOperationSale>({
        id: 0, description: "", type: "", controlsStock: true,
        generateFinancial: true, allowDiscount: true, updateCost: true,
        finalConsumer: true, requiresInvoice: true, isReturn: false, cfop: "",
        defaultNature: "", active: true
    })

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target
        setOperationSale({ ...operationSale, [name]: value })

        setOperationSale({
            ...operationSale,
            [name]: type === "checkbox" ? checked : value
        });
    };

    useEffect(() => {
        const token = user?.token as string
        loadHandle(token, setOperationSales, 'operationsale', router)
    }, [user?.token])

    return (
        <>
            {/* <p>{JSON.stringify(operationSale.cfop)}</p> */}
            <br />
            {/* <p>{JSON.stringify(operationSales)}</p> */}
            <OperationSaleForm
                handleChange={handleChange}
                operationSales={operationSales}
                setChildren={setOperationSale}
            >
                {operationSale}
            </OperationSaleForm>
        </>
    )
}