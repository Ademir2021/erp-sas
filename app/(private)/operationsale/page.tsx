'use client'
import OperationSaleForm from "@/app/components/OperationSale/OperationSaleForm";
import { loadHandle } from "@/app/lib/handleApi";
import { userAuth } from "@/app/lib/userAuth";
import { TResponseMessage } from "@/app/models/TMessage";
import { TOperationSale } from "@/app/models/TSale";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";

export default function OperationSale() {

    const router = useRouter()
    const { user } = userAuth();
    const [msg, setMsg] = useState('')
    const [operationSales, setOperationSales] = useState<TOperationSale[]>([])
    const initialOperationSale:TOperationSale = {
        id: 0, description: "", type: "", controlsStock: true,
        generateFinancial: true, allowDiscount: true, updateCost: true,
        finalConsumer: true, requiresInvoice: true, isReturn: false, cfop: "",
        defaultNature: "", active: true
    }
    const [operationSale, setOperationSale] = useState<TOperationSale>(initialOperationSale)

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target
        setOperationSale({ ...operationSale, [name]: value })
        setOperationSale({
            ...operationSale,
            [name]: type === "checkbox" ? checked : value
        });
    };

    function clearFields(){
        setOperationSale({...initialOperationSale})
    }

    useEffect(() => {
        const token = user?.token as string
        loadHandle(token, setOperationSales, 'operationsale', router)
    }, [user?.token])

    async function updateOperationSale(operationSale: TOperationSale) {
        const res = await fetch('/api/operationsale', {
            method: 'PUT',
            body: JSON.stringify(operationSale),
        })
        const resp: TResponseMessage = await res.json()
        if (!res.ok) {
            setMsg(`Erro ao atualizar Operação: ${resp.error}`)
            return
        }
        router.push('/operationsale')
        setMsg(`${resp.data.message} ID: ${resp.data.id} : ${resp.success}`)
        router.refresh()
    }

    async function saveOperationSale(operationSale: TOperationSale) {
        const res = await fetch('/api/operationsale', {
            method: 'POST',
            body: JSON.stringify(operationSale),
        })
        if (!res.ok) {
            setMsg(`Erro ao registrar Operação: ${JSON.stringify(res)}`)
            return
        }
        router.push('/operationsale')
        setMsg('Operação registrada com sucesso')
        router.refresh()
    }

    function valFields(o: TOperationSale) {
        const missing: string[] = [];
        if (o.description === "") missing.push('Descrição');
        if (o.defaultNature === "") missing.push('Natureza da Operação');
        if (o.type === "") missing.push('Tipo');
        if (o.cfop === "") missing.push('CFOP');
        if (missing.length === 0) {
            return true;
        }
        return 'Falta preencher os campos: ' + missing.join(', ') + '.';
    }

    function handleSubmit(e: Event) {
        e.preventDefault()
        if (valFields(operationSale) === true) {
            operationSale.id === 0 ? saveOperationSale(operationSale) :
            updateOperationSale(operationSale);
            clearFields()
        } else {
            setMsg(valFields(operationSale) as any)
        }
    }

    return (
        <>
            <OperationSaleForm
                handleChange={handleChange}
                operationSales={operationSales}
                setChildren={setOperationSale}
                handleSubmit={handleSubmit}
                msg={msg}
            >
                {operationSale}
            </OperationSaleForm>
        </>
    )
}