import { TAccountsReceivable } from "@/app/models/TAccountsReceivable"


type Props = {
    accountsReceivable: TAccountsReceivable[]
}

export function AccountsReceivableList({
    accountsReceivable }: Props) {

    const styles_th = "px-1 py-1 text-[11px] font-semibold text-gray-200"
    const styles_td = "px-1 py-1 text-[11px]"

    function updateAccountsReceivable(ar: TAccountsReceivable) {
        console.log(ar)
    }

    return <>
        <div className="mt-2 w-full overflow-x-auto">
            <table className="min-w-full border border-gray-100 rounded-b-md overflow-hidden shadow-sm">
                {accountsReceivable.length > 0 && <thead className="bg-gray-500">
                    <tr>
                        <th className={`${styles_th} text-center`}>ID</th>
                        <th className={`${styles_th} text-left`}>Emitida</th>
                        <th className={`${styles_th} text-center`}>Recebida</th>
                        <th className={`${styles_th} text-center`}>IDBrand</th>
                        <th className={`${styles_th} text-center`}>IDUser</th>
                        <th className={`${styles_th} text-center`}>IDPay</th>
                        <th className={`${styles_th} text-center`}>IDSale</th>
                        <th className={`${styles_th} text-left`}>Valor</th>
                        <th className={`${styles_th} text-center`}>VRecebido</th>
                        <th className={`${styles_th} text-center`}>Situação</th>
                        <th className={`${styles_th} text-left`}>Saldo</th>
                        <th className={`${styles_th} text-center`}>DRecebimento</th>
                        <th className={`${styles_th} text-left`}>Descrição</th>
                        <th className={`${styles_th} text-left`}>Observação</th>
                        <th className={`${styles_th} text-left`}>Juros</th>
                        <th className={`${styles_th} text-left`}>Multa</th>
                        <th className={`${styles_th} text-left`}>Desconto</th>
                        <th className={`${styles_th} text-left`}>Tipo</th>
                        <th className={`${styles_th} text-left`}>TPayRecebido</th>
                        <th className={`${styles_th} text-left`}>IDTipoOper</th>
                        <th className={`${styles_th} text-left`}>DescrTipoOper</th>
                        <th className={`${styles_th} text-left`}>Ações</th>
                    </tr>
                </thead>}

                <tbody className="divide-y divide-gray-200">
                    {accountsReceivable.map((ar: TAccountsReceivable) => (
                        <tr key={ar.id} className="hover:bg-gray-600 transition text-sky-100 ">
                            <td className={`${styles_td} text-center`}>{ar.id}</td>
                            <td className={`${styles_td} text-left`}>{ar.createdAt as any}</td>
                            <td className={`${styles_td} text-left`}>{ar.updatedAt as any || "Em Aberto"}</td>
                            <td className={`${styles_td} text-center`}>{ar.branch.id}</td>
                            <td className={`${styles_td} text-center`}>{ar.user.id}</td>
                            <td className={`${styles_td} text-center`}>{ar.payer.id}</td>
                            <td className={`${styles_td} text-center`}>{ar.sale.id}</td>
                            <td className={`${styles_td} text-left`}>{ar.value}</td>
                            <td className={`${styles_td} text-left`}>{ar.receivedValue}</td>
                            <td className={`${styles_td} text-left`}>{ar.situation}</td>
                            <td className={`${styles_td} text-left`}>{ar.balance}</td>
                            <td className={`${styles_td} text-left`}>{ar.dueDate as any}</td>
                            <td className={`${styles_td} text-left`}>{ar.description}</td>
                            <td className={`${styles_td} text-left`}>{ar.observations}</td>
                            <td className={`${styles_td} text-left`}>{ar.lateFee.toFixed(2)}</td>
                            <td className={`${styles_td} text-left`}>{ar.interest.toFixed(2)}</td>
                            <td className={`${styles_td} text-left`}>{ar.discount}</td>
                            <td className={`${styles_td} text-left`}>{ar.type}</td>
                            <td className={`${styles_td} text-left`}>{ar.descriptionTypeOperation}</td>
                            <td className={`${styles_td} text-left`}>{ar.idTypeOperation}</td>
                            <td className={`${styles_td} text-left`}>{ar.descriptionTypeOperation}</td>
                            <td className={`${styles_td} text-center`}><a href="#up-ar"
                                onClick={() => updateAccountsReceivable(ar)}
                                className="px-3 py-1 text-[12px] font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
                            >Receber</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
}