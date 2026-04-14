import { DateFns } from "@/app/lib/dateFns"
import { TCashMovement } from "@/app/models/TCashMovement"
import { globalStyles_td, globalStyles_th } from "../GlobalStyles"


type Props = {
    cashmovements: TCashMovement[]
}

export default function CashmovementList({ cashmovements }: Props) {

    const dateFns = new DateFns()

    return <>
        <div className="mt-2 w-full overflow-x-auto">
            <table className="min-w-full border border-gray-100 rounded-b-md overflow-hidden shadow-sm">
                {cashmovements.length > 0 && <thead className="bg-gray-500">
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
                <tbody className="divide-y divide-gray-200">
                    {cashmovements.map((cash: TCashMovement) => (
                        <tr key={cash.id} className="hover:bg-gray-600 transition text-sky-100 ">
                            <td className={`${globalStyles_td} text-center`}>{cash.id}</td>
                            <td className={`${globalStyles_td} text-left`}>{`R$ ${parseFloat(cash.amount).toFixed(2)}`}</td>
                            <td className={`${globalStyles_td} text-left`}>{cash.description}</td>
                            <td className={`${globalStyles_td} text-left`}>{dateFns.formatDate(cash.movementDate as any)}</td>
                            <td className={`${globalStyles_td} text-center`}>{cash.movementType}</td>
                            <td className={`${globalStyles_td} text-center`}>{cash.balanceAfter}</td>
                            <td className={`${globalStyles_td} text-center`}>{String(cash.accountsReceivable || 0).padStart(6, '0')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
}