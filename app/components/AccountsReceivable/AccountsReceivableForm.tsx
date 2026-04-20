import { TAccountsReceivable, TReceipt } from "@/app/models/TAccountsReceivable";
import { AccountsReceivableList } from "./AccountsReceivableList";
import { useState } from "react";
import ShowForm from "../ShowForm";
import { globalStyles_form } from "../GlobalStyles";

type Props = {
    accountsReceivable: TAccountsReceivable[]
    msg: string
    setOpenAccount: Function
    handleSubmit?: any
    setReceipt: Function
    receipt: TReceipt

}

export default function AccountsReceivableForm({
    accountsReceivable, msg, setOpenAccount, handleSubmit,
    setReceipt, receipt
}: Props) {

    const [showForm, setShowForm] = useState(false)

    const styles_input = "w-full p-2 border rounded-lg"

    return <>
        <p className="text-xl font-bold text-center">Contas a Receber</p>
        <ShowForm
        showForm={showForm}
        setShowForm={setShowForm}
        />
        {showForm && <> {accountsReceivable.length > 0 ? <div className={`${globalStyles_form} max-w-xl mx-auto `}>
            <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
                <label>Informe o Valor a Receber</label>
                <input
                    className={`${styles_input}`}
                    type="number"
                    value={receipt.receipt || ''}
                    placeholder="Ex: 100.00"
                    onChange={(e) =>
                        setReceipt({
                            ...receipt,
                            receipt: Number(e.target.value)
                        })}
                />
                <input
                    className={`${styles_input}`}
                    type="number"
                    value={receipt.discount || ''}
                    placeholder="Desconto Concedido - (Ex: 10.00)"
                    onChange={(e) =>
                        setReceipt({
                            ...receipt,
                            discount: Number(e.target.value)
                        })}
                />
            </form>
        </div> : <p className="flex justify-center p-4 text-green-300 ">Nenhuma conta a receber encontrada.</p>}
            {msg && <p>{msg}</p>}</>}
        <AccountsReceivableList
            accountsReceivable={accountsReceivable}
            setOpenAccount={setOpenAccount}
            handleSubmit={handleSubmit}
            receipt={receipt}
        />
    </>
}