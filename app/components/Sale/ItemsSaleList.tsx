import { TItemsSale } from "@/app/models/TSale"
import { globalStyles_overflow, globalStyles_table_list } from "../GlobalStyles"

type Props = {
    itemsSale: TItemsSale[]
    setItemsSale: Function
}

export function ItemsSaleList({ itemsSale, setItemsSale }: Props) {

    const styles_th = "px-2 py-1 text-[11px] font-semibold text-gray-300"
    const styles_td = "px-2 py-1 text-[11px]"

    function removeItem(itemSale: TItemsSale) {
        setItemsSale((prev: any) =>
            prev.filter((i: TItemsSale) => i.item.id !== itemSale.item.id)
        )
    }

    const updateAmount = (id: number, newAmount: number) => {
        if (newAmount <= 0) return;
        setItemsSale((prev: TItemsSale[]) =>
            prev.map((item) =>
                item.item.id === id
                    ? { ...item, amount: newAmount }
                    : item
            )
        );
    };

    return <>
        <div className={globalStyles_overflow}>
            <table className={globalStyles_table_list}>
                {itemsSale.length > 0 && <thead className="bg-gray-700">
                    <tr>
                        <th className={`${styles_th} text-center`}>ID</th>
                        <th className={`${styles_th} text-left`}>Descrição</th>
                        <th className={`${styles_th} text-left`}>Quant</th>
                        <th className={`${styles_th} text-left`}>Preço</th>
                        <th className={`${styles_th} text-left`}>TItem</th>
                        <th className={`${styles_th} text-center`}>X</th>
                    </tr>
                </thead>}
                <tbody className="divide-y divide-gray-200">
                    {itemsSale.map((item: TItemsSale) => (
                        <tr key={item.item.id} className="hover:bg-gray-600 transition text-sky-100 ">
                            <td className={`${styles_td} text-center`}>{item.item.id}</td>
                            <td className={`${styles_td} text-left`}>{item.item.name}</td>
                            <td className={`${styles_td} text-left`}>
                                <input
                                    type="number"
                                    min={1}
                                    value={item.amount}
                                    placeholder={item.amount > 0 ? "UN" : "KG"}
                                    onChange={(e) => updateAmount(item.item.id, Number(e.target.value))}
                                    className="w-12 text-black px-1 rounded cursor-pointer"
                                />
                            </td>
                            <td className={`${styles_td} text-left`}>{item.item.priceMax.toFixed(2)}</td>
                            <td className={`${styles_td} text-left`}>{(item.amount * item.item.priceMax).toFixed(2)}</td>
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