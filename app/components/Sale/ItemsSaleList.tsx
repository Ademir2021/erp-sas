import { TItemsSale } from "@/app/models/TSale"
import { globalStyles_color_th, globalStyles_overflow, globalStyles_table_list, globalStyles_tbody_list, globalStyles_thead_list, globalStyles_tr } from "../GlobalStyles"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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
                {itemsSale.length > 0 && <thead className={globalStyles_thead_list}>
                    <tr>
                        <th className={`${styles_th} text-center ${globalStyles_color_th}`}>ID</th>
                        <th className={`${styles_th} text-left  ${globalStyles_color_th}`}>Descrição</th>
                        <th className={`${styles_th} text-left ${globalStyles_color_th}`}>Quant</th>
                        <th className={`${styles_th} text-left  ${globalStyles_color_th}`}>Preço</th>
                        <th className={`${styles_th} text-left  ${globalStyles_color_th}`}>TItem</th>
                        <th className={`${styles_th} text-center  ${globalStyles_color_th}`}>
                            <DeleteForeverIcon titleAccess="Remover Item"/></th>
                    </tr>
                </thead>}
                <tbody className={globalStyles_tbody_list}>
                    {itemsSale.map((item: TItemsSale) => (
                        <tr key={item.item.id} className={globalStyles_tr}>
                            <td className={`${styles_td} text-center`}>{item.item.id}</td>
                            <td className={`${styles_td} text-left`}>{item.item.name}</td>
                            <td className={`${styles_td} text-left`}>
                                <input
                                    type="number"
                                    min={1}
                                    value={item.amount}
                                    placeholder={item.amount > 0 ? "UN" : "KG"}
                                    onChange={(e) => updateAmount(item.item.id, Number(e.target.value))}
                                    className="w-12 text-white px-1 rounded cursor-pointer"
                                />
                            </td>
                            <td className={`${styles_td} text-left`}>{item.item.priceMax.toFixed(2)}</td>
                            <td className={`${styles_td} text-left`}>{(item.amount * item.item.priceMax).toFixed(2)}</td>
                            <td className={`${styles_td} text-center`}><a href="#up-item"
                                onClick={() => removeItem(item)}
                                className="px-0 py-1 rounded-md hover:bg-red-700 transition"
                            ><DeleteForeverIcon titleAccess="Remover"/></a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
}