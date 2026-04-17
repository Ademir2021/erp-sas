import { TItem } from "@/app/models/TItem"
import { globalStyles_btn_list, globalStyles_overflow, globalStyles_table_list, globalStyles_tbody_list, globalStyles_td, globalStyles_th, globalStyles_thead_list, globalStyles_tr } from "../GlobalStyles"

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

    return (
        <div className={globalStyles_overflow}>
            <table className={globalStyles_table_list}>
                <thead className={globalStyles_thead_list}>
                    <tr>
                        <th className={`${globalStyles_th} text-center`}>ID</th>
                        <th className={`${globalStyles_th} text-left`}>Descrição</th>
                        <th className={`${globalStyles_th} text-left`}>Preço min</th>
                        <th className={`${globalStyles_th} text-left`}>Preço max</th>
                        <th className={`${globalStyles_th} text-left`}>BarCode</th>
                        <th className={`${globalStyles_th} text-left`}>SubGrupo</th>
                        <th className={`${globalStyles_th} text-left`}>Grupo</th>
                        <th className={`${globalStyles_th} text-center`}>Ações</th>
                    </tr>
                </thead>
                <tbody className={globalStyles_tbody_list}>
                    {items.map((item: TItem) => (
                        <tr key={item.id} className={globalStyles_tr}>
                            <td className={`${globalStyles_td} text-center`}>{item.id}</td>
                            <td className={`${globalStyles_td} text-left`}>{item.name}</td>
                            <td className={`${globalStyles_td} text-left`}>{item.priceMin}</td>
                            <td className={`${globalStyles_td} text-left`}>{item.priceMax}</td>
                            <td className={`${globalStyles_td} text-left`}>{item.barCode}</td>
                            <td className={`${globalStyles_td} text-left`}>{item.subGroup.group.name}</td>
                            <td className={`${globalStyles_td} text-left`}>{item.subGroup.name}</td>
                            <td className={`${globalStyles_td} text-center`}><a href="#up-item"
                                onClick={() => updateList(item)}
                                className={globalStyles_btn_list}
                            >Atualizar</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}