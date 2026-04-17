import { DateFns } from "@/app/lib/dateFns"
import { TCashMovement } from "@/app/models/TCashMovement"
import { globalStyles_overflow, globalStyles_table_list, globalStyles_tbody_list, globalStyles_td, globalStyles_th, globalStyles_thead_list, globalStyles_tr } from "../GlobalStyles"

type Props = {
    cashmovements: TCashMovement[]
}

export default function CashmovementList({ cashmovements }: Props) {

    const dateFns = new DateFns()

    return (
        <div className={globalStyles_overflow}>
            <table className={globalStyles_table_list}>
                {cashmovements.length > 0 && <thead className={globalStyles_thead_list}>
                    <tr>
                        <th className={`${globalStyles_th} text-center`}>ID</th>
                        <th className={`${globalStyles_th} text-left`}>Valor</th>
                        <th className={`${globalStyles_th} text-left`}>Descrição</th>
                        <th className={`${globalStyles_th} text-left`}>Data Moviemnto</th>
                        <th className={`${globalStyles_th} text-center`}>D/C</th>
                        <th className={`${globalStyles_th} text-center`}>Saldo</th>
                        <th className={`${globalStyles_th} text-center`}>ID Conta</th>
                    </tr>
                </thead>}
                <tbody className={globalStyles_tbody_list}>
                    {cashmovements.map((cash: TCashMovement) => (
                        <tr key={cash.id} className={globalStyles_tr}>
                            <td className={`${globalStyles_td} text-center`}>{cash.id}</td>
                            <td className={`${globalStyles_td} text-left`}>{`R$ ${cash.amount.toFixed(2)}`}</td>
                            <td className={`${globalStyles_td} text-left`}>{cash.description}</td>
                            <td className={`${globalStyles_td} text-left`}>{dateFns.formatDate(cash.movementDate as any)}</td>
                            <td className={`${globalStyles_td} text-center`}>{cash.movementType}</td>
                            <td className={`${globalStyles_td} text-center`}>{cash.balanceAfter}</td>
                            <td className={`${globalStyles_td} text-center`}>{String(cash.accountsReceivable?.id || 0).padStart(6, '0')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}