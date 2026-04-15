import { DateFns } from "@/app/lib/dateFns"
import { TSaleResponse } from "@/app/models/TSale"
import { globalStyles_overflow, globalStyles_table_list, globalStyles_td, globalStyles_th } from "../GlobalStyles"

type Props = {
    sales: TSaleResponse[]
}

export default function SalesList({ sales }: Props) {

    const dateFns = new DateFns()

    return <>
        <div className={globalStyles_overflow}>
            <table className={globalStyles_table_list}>
                {sales.length > 0 && <thead className="bg-gray-500">
                    <tr>
                        <th className={`${globalStyles_th} text-center`}>ID</th>
                        <th className={`${globalStyles_th} text-left`}>Emissão</th>
                        <th className={`${globalStyles_th} text-left`}>TVenda</th>
                        <th className={`${globalStyles_th} text-left`}>Desc</th>
                        <th className={`${globalStyles_th} text-left`}>TNota</th>
                        <th className={`${globalStyles_th} text-left`}>CFOP</th>
                        <th className={`${globalStyles_th} text-left`}>Operação</th>
                        <th className={`${globalStyles_th} text-center`}>Imprimir</th>
                    </tr>
                </thead>}
                <tbody className="divide-y divide-gray-200">
                    {sales.map((sale: TSaleResponse) => (
                        <tr key={sale.id} className="hover:bg-gray-600 transition text-sky-100 ">
                            <td className={`${globalStyles_td} text-center`}>{String(sale.id || 0).padStart(6, '0')}</td>
                            <td className={`${globalStyles_td} text-left`}>{dateFns.formatDate(sale.issueDate as any)}</td>
                            <td className={`${globalStyles_td} text-left`}>{`R$ ${sale.totalSale.toFixed(2)}`}</td>
                            <td className={`${globalStyles_td} text-left`}>{`R$ ${sale.discount.toFixed(2) || 0.00}`}</td>
                            <td className={`${globalStyles_td} text-left`}>{`R$ ${sale.totalNote.toFixed(2)}`}</td>
                            <td className={`${globalStyles_td} text-left`}>{sale.operationSale.cfop}</td>
                            <td className={`${globalStyles_td} text-left`}>{sale.operationSale.description}</td>
                            <td className={`${globalStyles_td} text-center`}><a href={`${process.env.NEXT_PUBLIC_API_NOTA}/${sale.id}/pdf`}>Imprimir</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
}