import { TOperationSale } from "@/app/models/TSale"
import { useEffect, useState } from "react"
import Pagination from "../Pagination/Pagination"
import { globalStyles_btn_list, globalStyles_overflow, globalStyles_table_list, globalStyles_tbody_list, globalStyles_td, globalStyles_th, globalStyles_thead_list, globalStyles_tr } from "../GlobalStyles"


type Props ={
     operationSales: TOperationSale[]
     setChildren: Function
}


export default function OperationSaleList({operationSales, setChildren}:Props){

      const [currentPage, setCurrentPage] = useState(1)
        const itemsPerPage = 8
        const totalPages = Math.ceil(operationSales.length / itemsPerPage)
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const currentItems = operationSales.slice(indexOfFirstItem, indexOfLastItem)
        const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    
        useEffect(() => {
            setCurrentPage(1)
        }, [operationSales])
    
        function updateList(operationSale: TOperationSale) {
            setChildren(operationSale)
        }

    return(
        <>
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
                            {currentItems.map((o: TOperationSale) => (
                                <tr key={o.id} className={globalStyles_tr}>
                                    <td className={`${globalStyles_td} text-center`}>{o.id}</td>
                                    <td className={`${globalStyles_td} text-left`}>{o.description}</td>
                                    <td className={`${globalStyles_td} text-left`}>{o.active}</td>
                                    <td className={`${globalStyles_td} text-left`}>{o.cfop}</td>
                                    <td className={`${globalStyles_td} text-left`}>{o.controlsStock}</td>
                                    <td className={`${globalStyles_td} text-left`}>{o.defaultNature}</td>
                                    <td className={`${globalStyles_td} text-left`}>{o.isReturn}</td>
                                    <td className={`${globalStyles_td} text-center`}><a href="#up-item"
                                        onClick={() => updateList(o)}
                                        className={globalStyles_btn_list}
                                    >Atualizar</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    props={operationSales}
                    setCurrentPage={setCurrentPage}
                    pageNumbers={pageNumbers}
                    currentPage={currentPage}
                    indexOfLastItem={indexOfLastItem}
                />
</>
    )
}