import { TItemsSale } from "@/app/models/TSale"

type Props = {
    itemsSale: TItemsSale[]
    setItemsSale: Function
}

export function ItemsSaleList({ itemsSale, setItemsSale }: Props) {

    function removeItem(itemSale: TItemsSale) {
        setItemsSale((prev: any) =>
            prev.filter((i: TItemsSale) => i.item.id !== itemSale.item.id)
        )
    }
    return <>
        <br />
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            {itemsSale.length > 0 && <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">ID</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Descrição</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Quant</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Preço</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">TItem</th>
                    <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Ações</th>
                </tr>
            </thead>}
            <tbody className="divide-y divide-gray-200">
                {itemsSale.map((item: TItemsSale) => (
                    <tr key={item.item.id} className="hover:bg-gray-600 transition text-sky-100 ">
                        <td className="px-4 py-2 text-center">{item.item.id}</td>
                        <td className="px-4 py-2 text-left">{item.item.name}</td>
                        <td className="px-4 py-2 text-left">
                            {item.amount}
                        </td>
                        <td className="px-4 py-2 text-left">
                            {item.item.priceMax}
                        </td>

                        <td className="px-4 py-2 text-left">
                            {item.tItem = item.amount * item.price}
                        </td>

                        <td className="px-4 py-2 text-center">
                            <a href="#up-item"
                                onClick={() => removeItem(item)}
                                className="px-1 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-blue-700 transition"
                            >X</a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
}