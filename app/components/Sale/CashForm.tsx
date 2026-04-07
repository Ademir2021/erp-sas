
import { TSale } from "@/app/models/TSale";
import { globalStylesTitle } from "../GlobalStyles";

type Props = {
    cash: number;
    setCash: Function
    sale: TSale
    setSale: Function
}

export default function CashForm({ cash, setCash, sale, setSale }: Props) {

    const styles_input = "w-full p-2 border bg-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"

    return (
        <form className="flex-col justify-center mt-1 space-y-2">
            <label className={`${globalStylesTitle} mb-0`} >
                Receber em Dinheiro - {"(Cash)"}</label>
            <input className={`${styles_input}`}
                type="number"
                value={cash || ''}
                max={sale?.tSale ? Number(sale.tSale) : undefined}
                placeholder='Em Dinheiro, Ex:100.00'
                onChange={(e) => {
                    let value = parseFloat(e.target.value) || 0;
                    if (value > Number(sale.tSale)) {
                        value = Number(sale.tSale);
                    }
                    setCash(value);
                }}
            />
            <label className={`${globalStylesTitle} mb-0`} >
                Desconto sobre a Venda</label>
            <input className={`${styles_input}`}
                type="number"
                value={sale.discount || ''}
                placeholder="Desconto, Ex:10.00"
                onChange={(e) => {
                    setSale({ ...sale, discount: parseFloat(e.target.value) || 0 });
                }}
            />
        </form>
    )
}