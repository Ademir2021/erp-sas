import { TItem } from "@/app/models/TITem"

type Props = {
    items: TItem[]
    setChildren: Function
}

export default function ItemsList({
    items,
    setChildren
}: Props) {

    function updateList(item: TItem) {
        setChildren(item)
    }

    return <>
        <br />
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">ID</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Descrição</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Preço min</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Preço max</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">BarCode</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">SubGrupo</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Grupo</th>
                    <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Ações</th>
                </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
                {items.map((item: TItem) => (
                    <tr key={item.id} className="hover:bg-gray-600 transition text-sky-100 ">
                        <td className="px-4 py-2 text-center">{item.id}</td>
                        <td className="px-4 py-2 text-left">{item.name}</td>
                        <td className="px-4 py-2 text-left">
                            {item.priceMin}
                        </td>
                        <td className="px-4 py-2 text-left">
                            {item.priceMax}
                        </td>
                        <td className="px-4 py-2">
                            {item.barCode}
                        </td>
                        <td className="px-4 py-2">
                            {item.subGroup.group.name}
                        </td>
                        <td className="px-4 py-2">
                            {item.subGroup.name}
                        </td>
                        <td className="px-4 py-2 text-center">
                            <a href="#up-person"
                                onClick={() => updateList(item)}
                                className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
                            >Atualizar</a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
}