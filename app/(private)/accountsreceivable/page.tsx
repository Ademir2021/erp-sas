'use client'

import { useEffect, useState } from "react";
import AccountsReceivableForm from "@/app/components/AccountsReceivable/AccountsReceivableForm";
import { TAccountsReceivable, TReceipt } from "@/app/models/TAccountsReceivable";
import { TUser } from "@/app/models/TUser";
import { getUser } from "@/app/lib/auth";
import { loadHandle } from "@/app/lib/handleApi";
import { differenceInDays, isValid } from "date-fns";
import { useRouter } from 'next/navigation'
import { TResponseMessage } from "@/app/models/TMessage";

export default function AccountsReceivable() {

    const router = useRouter()
    const [msg, setMsg] = useState('')
    const [isInterestFine, setIsInterestFine] = useState(true)
    const [user, setUser] = useState<TUser>()
    const [accountsReceivables, setAccountsReceivables] = useState<TAccountsReceivable[]>([])
    const [openAccounts, setOpenAccounts] = useState<TAccountsReceivable[]>([])
    const [openAccount, setOpenAccount] = useState<TAccountsReceivable | null>(null)
    const [receipt, setReceipt] = useState<TReceipt>({ receipt: 0, discount: 0 })

    const processAccounts = (accounts: TAccountsReceivable[]) => {
        const today = new Date();
        return accounts
            .map((conta) => {
                const maturity = new Date(conta.dueDate);
                if (!isValid(maturity)) return conta;
                const daysOfDelay = differenceInDays(today, maturity);
                const value = Number(conta.value) || 0;
                let lateFee = 0; //juros
                let interest = 0; //multa
                if (isInterestFine && daysOfDelay > 0 && daysOfDelay < 500) {
                    // Juros ao dia
                    const monthlyRate = 0.10;
                    const dailyRate = monthlyRate / 30;
                    lateFee = value * daysOfDelay * dailyRate;
                    // Multa de  3% fixo após 5 dias corridos
                    interest = daysOfDelay > 5 ? value * 0.03 : 0;
                }
                return {
                    ...conta,
                    lateFee,
                    interest
                };
            })
            .filter((c) => c.situation !== "CHARGE" && c.balance > 0);
    };

    useEffect(() => {
        const updatedAccounts: TAccountsReceivable[] = processAccounts(accountsReceivables)
        setOpenAccounts(updatedAccounts);
    }, [accountsReceivables, isInterestFine])


    useEffect(() => {
        async function loadUser() {
            const user = await getUser()
            setUser(user)
    }
        loadUser()
    }, [])

    useEffect(() => {
        const token = user?.token as string
        loadHandle(token, setAccountsReceivables, 'accountsreceivable', router)
    }, [user]);


    async function updateAccountsReceivable(ar: TAccountsReceivable) {

        const res = await fetch('/api/accountsreceivable', {
            method: 'PUT',
            body: JSON.stringify(ar),
        })

        const resp: TResponseMessage = await res.json()

        if (!res.ok) {
            setMsg(`Erro ao atualizar Titulo: ${resp.error}`)
            return
        }
        router.push('/accountsreceivable')
        setMsg(`${resp.data.message} ID: ${resp.data.id} : ${resp.success}`)
        router.refresh()
    }

    function prepareUpdate() {
        if (!openAccount) return;
        const up = {
            ...openAccount,
            ...(receipt.discount > 0 && { discount: receipt.discount }),
            ...(receipt.receipt > 0 && { receivedValue: receipt.receipt })
        };
        const UPDATE_AR = {
            id: up.id,
            branch: { id: up.branch.id },
            user: { id: user?.id || up.user?.id },
            payer: { id: up.payer.id },
            sale: { id: up.sale.id },
            value: up.value,
            receivedValue: up.receivedValue,
            balance: up.balance,
            dueDate: up.dueDate,
            description: up.description,
            situation: up.situation,
            observations: up.observations,
            lateFee: up.lateFee,
            interest: up.interest,
            discount: up.discount,
            type: up.type,
            idTypeOperation: up.idTypeOperation,
            descriptionTypeOperation: up.descriptionTypeOperation
        }
        updateAccountsReceivable(UPDATE_AR as any);
    }

    useEffect(() => {
        if (openAccount !== null) {
            handleSubmit();
        }
    }, [openAccount]);

    function handleSubmit() {
        if (openAccount !== null && receipt.receipt !== 0) {
            prepareUpdate()
            setReceipt({ ...receipt, receipt: 0, discount: 0 })
        } else {
            setMsg("Informe um valor a Receber")
        }
    }

    return <>
        <AccountsReceivableForm
            accountsReceivable={openAccounts}
            msg={msg}
            setOpenAccount={setOpenAccount}
            handleSubmit={handleSubmit}
            setReceipt={setReceipt}
            receipt={receipt}
        
        />
    </>
}