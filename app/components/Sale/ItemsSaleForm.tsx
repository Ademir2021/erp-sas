import { TItem } from "@/app/models/TITem";
import { TItemsSale } from "@/app/models/TSale";

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
    return <>
        <div className="mt-2 w-full overflow-x-auto">
            <table className="min-w-full border border-gray-100 rounded-b-md overflow-hidden shadow-sm">
                {items.length > 0 && <thead className="bg-gray-500">
                    <tr>
                        <th className={`${styles_th} text-center`}>ID</th>
                        <th className={`${styles_th} text-left`}>Descrição</th>
                        <th className={`${styles_th} text-center`}>Inserir</th>
                        <th className={`${styles_th} text-left`}>Preço min</th>
                        <th className={`${styles_th} text-left`}>Preço max</th>
                        <th className={`${styles_th} text-left`}>Código de barras</th>
                        <th className={`${styles_th} text-left`}>Sub grupo</th>
                        <th className={`${styles_th} text-left`}>Grupo</th>
                    </tr>
                </thead>}

                <tbody className="divide-y divide-gray-200">
                    {items.map((item: TItem) => (
                        <tr key={item.id} className="hover:bg-gray-600 transition text-sky-100 ">
                            <td className={`${styles_td} text-center`}>{item.id}</td>
                            <td className={`${styles_td} text-left`}>{item.name}</td>
                            <td className={`${styles_td} text-center`}><a href="#up-item"
                                onClick={() => insertItem(item)}
                                className="px-3 py-1 text-[12px] font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
                            >Inserir</a>
                            </td>
                            <td className={`${styles_td} text-left`}>{item.priceMin}</td>
                            <td className={`${styles_td} text-left`}>{item.priceMax}</td>
                            <td className={`${styles_td} text-left`}>{item.barCode}</td>
                            <td className={`${styles_td} text-left`}>{item.subGroup.group.name}</td>
                            <td className={`${styles_td} text-left`}>{item.subGroup.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
}