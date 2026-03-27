import { TItemsSale } from "@/app/models/TSale"

type Props = {
    itemsSale: TItemsSale[]
    setItemsSale: Function
}

export function ItemsSaleList({ itemsSale, setItemsSale }: Props) {

    const styles_th = "px-4 py-2 text-[11px] font-semibold text-gray-700"
    const styles_td = "px-4 py-2 text-[11px]"

    function removeItem(itemSale: TItemsSale) {
        setItemsSale((prev: any) =>
            prev.filter((i: TItemsSale) => i.item.id !== itemSale.item.id)
        )
    }
    return <>
        <div className="w-full overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                {itemsSale.length > 0 && <thead className="bg-gray-100">
                    <tr>
                        <th className={`${styles_th} text-center`}>ID</th>
                        <th className={`${styles_th} text-left`}>Descrição</th>
                        <th className={`${styles_th} text-left`}>Quant</th>
                        <th className={`${styles_th} text-left`}>Preço</th>
                        <th className={`${styles_th} text-left`}>TItem</th>
                        <th className={`${styles_th} text-center`}>Ações</th>
                    </tr>
                </thead>}
                <tbody className="divide-y divide-gray-200">
                    {itemsSale.map((item: TItemsSale) => (
                        <tr key={item.item.id} className="hover:bg-gray-600 transition text-sky-100 ">
                            <td className={`${styles_td} text-center`}>{item.item.id}</td>
                            <td className={`${styles_td} text-left`}>{item.item.name}</td>
                            <td className={`${styles_td} text-left`}>{item.amount}</td>
                            <td className={`${styles_td} text-left`}>{item.item.priceMax}</td>
                            <td className={`${styles_td} text-left`}>{item.tItem = item.amount * item.price}</td>
                            <td className={`${styles_td} text-center`}><a href="#up-item"
                                onClick={() => removeItem(item)}
                                className="px-1 py-1 text-[10px] font-medium text-white bg-red-600 rounded-md hover:bg-blue-700 transition"
                            >X</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
}