import { TItem } from "@/app/models/TItem";
import { TItemsSale } from "@/app/models/TSale";
import { globalStyles_btn_list, globalStyles_overflow, globalStyles_table_list, globalStyles_tbody_list, globalStyles_thead_list, globalStyles_tr } from "../GlobalStyles";

type Props = {
    items: TItem[]
    setItemsSale: Function
    msg: string
}

export default function ITemsSaleForm({
    items, setItemsSale, msg
}: Props) {

    const styles_th = "px-1 py-1 text-[11px] font-semibold text-gray-200"
    const styles_td = "px-1 py-1 text-[11px]"

    function insertItem(item: TItem) {

        setItemsSale((prev: TItemsSale[]) => {
            const existingItemIndex = prev.findIndex(
                (i) => i.item.id === item.id) // Ajuste conforme a chave única do item

            if (existingItemIndex !== -1) { // Item já existe → incrementa quantidade
                return prev.map((i, index) =>
                    index === existingItemIndex
                        ? { ...i, amount: i.amount + 1, tItem: i.amount * i.price } : i)
            }

            const newItem: TItemsSale = {  // Item não existe → adiciona novo
                item,
                amount: 1,
                price: item.priceMax
            }

            return [...prev, newItem]
        })
    }
    return (
        <div className={globalStyles_overflow}>
            <table className={globalStyles_table_list}>
                {items.length > 0 && <thead className={globalStyles_thead_list}>
                    <tr>
                        <th className={`${styles_th} text-center`}>ID</th>
                        <th className={`${styles_th} text-left`}>Descrição</th>
                        {/* <th className={`${styles_th} text-left`}>Preço min</th> */}
                        <th className={`${styles_th} text-left`}>Valor</th>
                        <th className={`${styles_th} text-left`}>Código de barras</th>
                        <th className={`${styles_th} text-left`}>Sub grupo</th>
                        <th className={`${styles_th} text-left`}>Grupo</th>
                        <th className={`${styles_th} text-center`}>Inserir</th>
                    </tr>
                </thead>}

                <tbody className={globalStyles_tbody_list}>
                    {items.map((item: TItem) => (
                        <tr key={item.id} className={globalStyles_tr}>

                            <td className={`${styles_td} text-center`}>{item.id}</td>
                            {/* <td className={`${styles_td} text-left`}>{item.priceMin}</td> */}

                            <td className={`${styles_td} text-left`}><a className="font-bold text-blue-500 hover:underline"
                                href="##" onClick={() => insertItem(item)}
                            >{item.name}</a></td>

                            <td className={`${styles_td} text-left text-lg text-gray-300`}>{item.priceMax.toFixed(2)}</td>
                            <td className={`${styles_td} text-left`}>{item.barCode}</td>
                            <td className={`${styles_td} text-left`}>{item.subGroup.group.name}</td>
                            <td className={`${styles_td} text-left`}>{item.subGroup.name}</td>

                            <td className={`${styles_td} text-center`}><a href="#up-item"
                                onClick={() => insertItem(item)}
                                className={globalStyles_btn_list}
                            >Inserir</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}