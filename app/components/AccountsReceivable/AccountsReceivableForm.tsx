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

    const styles_input = "w-full p-2 border rounded-lg"

    return <>
        <p className="text-xl font-bold text-center">Contas a Receber</p>
        {accountsReceivable.length > 0 ? <div className="max-w-3xl mx-auto bg-gray-600 p-8 rounded-2xl shadow-lg">
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
        {msg && <p>{msg}</p>}
        <AccountsReceivableList
            accountsReceivable={accountsReceivable}
            setOpenAccount={setOpenAccount}
            handleSubmit={handleSubmit}
        />
    </>
}