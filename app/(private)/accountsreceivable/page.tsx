'use client'

import { useEffect, useState } from "react";
import AccountsReceivableForm from "@/app/components/AccountsReceivable/AccountsReceivableForm";
import { TAccountsReceivable } from "@/app/models/TAccountsReceivable";
import { TUser } from "@/app/models/TUser";
import { getUser } from "@/app/lib/auth";
import { loadHandle } from "@/app/lib/handleApi";
import { differenceInDays, isValid } from "date-fns";

export default function AccountsReceivable() {

    const [isInterestFine, setIsInterestFine] = useState(true)
    const [user, setUser] = useState<TUser>()
    const [accountsReceivables, setAccountsReceivable] = useState<TAccountsReceivable[]>([])
    const [openAccounts, setOpenAccounts] = useState<TAccountsReceivable[]>([])

    const processAccounts = (accounts: TAccountsReceivable[]) => {
        const today = new Date();
        return accounts
            .map((conta) => {
                const maturity = new Date(conta.dueDate);
                if (!isValid(maturity)) return conta;
                const daysOfDelay = differenceInDays(today, maturity);
                const value = Number(conta.value) || 0;
                const received = Number(conta.receivedValue) || 0;
                const discount = Number(conta.discount) || 0
                let lateFee = 0; //juros
                let interest = 0; //multa
                if (isInterestFine && daysOfDelay > 0 && daysOfDelay < 500) {
                     // Juros de 0,1% ao dia
                    lateFee = value * daysOfDelay * 0.001;
                    // Multa de  3% fixo após 5 dias corridos
                    interest = daysOfDelay > 5 ? value * 0.03 : 0;
                }
                const balance = value - received - discount + lateFee + interest
                return {
                    ...conta,
                    lateFee,
                    interest,
                    balance: Number(balance.toFixed(2))
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
        loadHandle(token, setAccountsReceivable, 'accountsreceivable')
    }, [user]);

    return <>
        {/* <p>{JSON.stringify(openAccounts)}</p> */}
        <AccountsReceivableForm
            accountsReceivable={openAccounts}
        />
    </>
}