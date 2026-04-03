import { TAccountsReceivable, TReceipt } from "@/app/models/TAccountsReceivable";
import { AccountsReceivableList } from "./AccountsReceivableList";

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

    return <>
        <p>AccountsReceivableForm</p>
        <div className="max-w-3xl mx-auto bg-gray-600 p-8 rounded-2xl shadow-lg">
            <form className="">
                <input
                    className="w-2x5 p-1 border rounded-lg"
                    type="number"
                    value={receipt.receipt || ''}
                    placeholder="Valor a Receber"
                    onChange={(e) =>
                        setReceipt({
                            ...receipt,
                            receipt: Number(e.target.value)
                        })}
                />
                 <input
                    className="w-2x5 p-1 border rounded-lg"
                    type="number"
                    value={receipt.discount || ''}
                    placeholder="Desconto"
                    onChange={(e) =>
                        setReceipt({
                            ...receipt,
                            discount: Number(e.target.value)
                        })}
                />
            </form>
        </div>
        {msg && <p>{msg}</p>}
        <AccountsReceivableList
            accountsReceivable={accountsReceivable}
            setOpenAccount={setOpenAccount}
            handleSubmit={handleSubmit}
        />
    </>
}