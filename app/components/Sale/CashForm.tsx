
import { TSale } from "@/app/models/TSale";
import { globalStylesTitle } from "../GlobalStyles";

type Props = {
    cash: number;
    setCash: Function
    sale: TSale
    setSale: Function
}

export default function CashForm({ cash, setCash, sale, setSale }: Props) {
    return (
        <form className="flex-col justify-center mt-1 space-y-2">
            <label className={`${globalStylesTitle} mb-0`} >Dinheiro</label>
            <input
                type="number"
                className="w-min p-1 border bg-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={cash || ''}
                placeholder='Em Dinheiro, Ex:100.00'
                onChange={(e) => {
                    setCash(parseFloat(e.target.value) || 0 );
                }}
            />
             <label className={`${globalStylesTitle} mb-0`} >Desconto</label>
            <input className="w-min p-1 border bg-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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