'use client'

import { useEffect, useState } from "react";
import AccountsReceivableForm from "@/app/components/AccountsReceivable/AccountsReceivableForm";
import { TAccountsReceivable } from "@/app/models/TAccountsReceivable";
import { TUser } from "@/app/models/TUser";
import { getUser } from "@/app/lib/auth";
import { loadHandle } from "@/app/lib/handleApi";


export default function AccountsReceivable(){

    const [user, setUser] = useState<TUser>()
    const [accountsReceivables, setAccountsReceivable] = useState<TAccountsReceivable[]>([])

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
{/* <p>{JSON.stringify(accountsReceivables)}</p> */}
<AccountsReceivableForm
accountsReceivable={accountsReceivables}
/>
</>
}