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
    handleSubmit: any
}

export default function SaleForm({
    children, setSearchITemName,
    items, itemsSale, setItemsSale, handleSubmit }: Props) {

    const totalSale = itemsSale.reduce(
        (total, i) => total + i.amount * i.price,
        0
    );

    return <>

        <div>
            <h1 className="font-bold">Console de Vendas</h1>
            {<p className="mt-1"><b>Total da Compra </b>{totalSale !== 0 ? `R$ ${totalSale.toFixed(2)}` : "R$ 0,00"}</p>}
            <hr/>
        </div>

        <ItemsSaleList
            itemsSale={itemsSale}
            setItemsSale={setItemsSale}
        />

        <form>
            <label className="font-black p-2">Pesquisar Items ...</label>
            <input
                className="mb-3 w-full p-3 border rounded-lg"
                placeholder="Buscar Item ..."
                onChange={(e) => setSearchITemName(e.target.value.toString())}
            />
        </form>

        <form>
            <a className="  px-2 py-2 bg-green-600 text-white rounded-lg"
                onClick={handleSubmit}>
                Finalizar Compra</a>
        </form>

        <ITemsSaleForm
            items={items}
            setItemsSale={setItemsSale}
        />
    </>
}