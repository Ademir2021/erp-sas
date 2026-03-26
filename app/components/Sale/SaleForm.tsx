import { TItemsSale, TSale } from "@/app/models/TSale"
import ITemsSaleForm from "./ItemsSaleForm"
import { TItem } from "@/app/models/TITem"
import { ItemsSaleList } from "./ItemsSaleList"

type Props = {
    children: TSale
    setSearchITemName: Function
    items: TItem[]
    itemsSale: TItemsSale[]
    setItemsSale: Function
}

export default function SaleForm({
    children, setSearchITemName,
    items, itemsSale, setItemsSale }: Props) {

    const totalSale = itemsSale.reduce(
        (total, i) => total + i.amount * i.price,
        0
    );

    return <>
        <div>
            <h1 className="font-bold">Console de Vendas</h1>
            {<p className="mt-1"><b>Total da Compra </b>{totalSale !== 0 ? `R$ ${totalSale.toFixed(2)}` : "R$ 0,00"}</p>}
        </div>
        <ItemsSaleList
            itemsSale={itemsSale}
        />
        <form>
            <label className="font-black p-2">Pesquisar Items ...</label>
            <input
                className="w-full p-3 border rounded-lg"
                placeholder="Buscar Item ..."
                onChange={(e) => setSearchITemName(e.target.value.toString())}
            />
        </form>
        <ITemsSaleForm
            items={items}
            itemsSale={itemsSale}
            setItemsSale={setItemsSale}
        />
    </>
}