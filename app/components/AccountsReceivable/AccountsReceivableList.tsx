import { DateFns } from "@/app/lib/dateFns"
import { TAccountsReceivable, TReceipt } from "@/app/models/TAccountsReceivable"
import { globalStyles_btn_list, globalStyles_overflow, globalStyles_table_list, globalStyles_tbody_list, globalStyles_td, globalStyles_th, globalStyles_thead_list, globalStyles_tr } from "../GlobalStyles"
import { txtValueReceived } from "@/app/(private)/accountsreceivable/fileTXT"

type Props = {
    accountsReceivable: TAccountsReceivable[]
    setOpenAccount: Function
    handleSubmit: any
    receipt: TReceipt
}

export function AccountsReceivableList({
    accountsReceivable, setOpenAccount, handleSubmit, receipt }: Props) {

    const dateFns = new DateFns()

    function updateAccountsReceivable(ar: TAccountsReceivable) {
        if (ar)
            setOpenAccount(ar)
        handleSubmit();
        receipt.receipt > 0 && txtValueReceived(ar, `recibo_${ar.id}".txt`, receipt)
    }

    return (
        <div className={globalStyles_overflow}>
            <table className={globalStyles_table_list}>
                {accountsReceivable.length > 0 && <thead className={globalStyles_thead_list}>
                    <tr>
                        <th className={`${globalStyles_th} text-center`}>ID</th>
                        <th className={`${globalStyles_th} text-left`}>Emitida</th>
                        <th className={`${globalStyles_th} text-center`}>Recebida</th>
                        <th className={`${globalStyles_th} text-center`}>IDBrand</th>
                        <th className={`${globalStyles_th} text-center`}>IDUser</th>
                        <th className={`${globalStyles_th} text-center`}>IDPay</th>
                        <th className={`${globalStyles_th} text-center`}>IDSale</th>
                        <th className={`${globalStyles_th} text-left`}>Valor</th>
                        <th className={`${globalStyles_th} text-center`}>VRecebido</th>
                        <th className={`${globalStyles_th} text-center`}>Situação</th>
                        <th className={`${globalStyles_th} text-left`}>Saldo</th>
                        <th className={`${globalStyles_th} text-left`}>DRecebimento</th>
                        <th className={`${globalStyles_th} text-left`}>Descrição</th>
                        <th className={`${globalStyles_th} text-left`}>Observação</th>
                        <th className={`${globalStyles_th} text-left`}>Juros</th>
                        <th className={`${globalStyles_th} text-left`}>Multa</th>
                        <th className={`${globalStyles_th} text-left`}>Desconto</th>
                        <th className={`${globalStyles_th} text-left`}>Tipo</th>
                        <th className={`${globalStyles_th} text-left`}>TPayRecebido</th>
                        <th className={`${globalStyles_th} text-left`}>IDTipoOper</th>
                        <th className={`${globalStyles_th} text-left`}>DescrTipoOper</th>
                        <th className={`${globalStyles_th} text-center`}>Receber</th>
                    </tr>
                </thead>}

                <tbody className={globalStyles_tbody_list}>
                    {accountsReceivable.map((ar: TAccountsReceivable) => (
                        <tr key={ar.id} className={globalStyles_tr}>
                            <td className={`${globalStyles_td} text-center`}>{ar.id}</td>
                            <td className={`${globalStyles_td} text-left`}>{dateFns.formatDate(ar.createdAt as any)}</td>
                            <td className={`${globalStyles_td} text-left`}>{ar.updatedAt as any || "Aberto"}</td>
                            <td className={`${globalStyles_td} text-center`}>{ar.branch.id}</td>
                            <td className={`${globalStyles_td} text-center`}>{ar.user.id}</td>
                            <td className={`${globalStyles_td} text-center`}>{ar.payer.id}</td>
                            <td className={`${globalStyles_td} text-center`}>{ar.sale.id}</td>
                            <td className={`${globalStyles_td} text-left`}>{ar.value}</td>
                            <td className={`${globalStyles_td} text-left`}>{ar.receivedValue}</td>
                            <td className={`${globalStyles_td} text-left`}>{ar.situation}</td>
                            <td className={`${globalStyles_td} text-left`}>{ar.balance}</td>
                            <td className={`${globalStyles_td} text-left`}>{ar.dueDate as any}</td>
                            <td className={`${globalStyles_td} text-left`}>{ar.description}</td>
                            <td className={`${globalStyles_td} text-left`}>{ar.observations}</td>
                            <td className={`${globalStyles_td} text-left`}>{ar.lateFee.toFixed(2)}</td>
                            <td className={`${globalStyles_td} text-left`}>{ar.interest.toFixed(2)}</td>
                            <td className={`${globalStyles_td} text-left`}>{ar.discount}</td>
                            <td className={`${globalStyles_td} text-left`}>{ar.type}</td>
                            <td className={`${globalStyles_td} text-left`}>{ar.descriptionTypeOperation}</td>
                            <td className={`${globalStyles_td} text-left`}>{ar.idTypeOperation}</td>
                            <td className={`${globalStyles_td} text-left`}>{ar.descriptionTypeOperation}</td>
                            <td className={`${globalStyles_td} text-center`}><a href="#up-ar"
                                onClick={() => updateAccountsReceivable(ar)}
                                className={globalStyles_btn_list}
                            >Receber</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}