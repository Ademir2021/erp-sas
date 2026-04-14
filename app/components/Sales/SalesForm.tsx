import { TSaleResponse } from "@/app/models/TSale"
import SalesList from "./SalesList"

type Props = {
    sales:TSaleResponse[]
}

export default function SalesForm ({sales}:Props){

    return<>
    <p>Vendas</p>
    <SalesList
    sales={sales}
    />
    </>
}