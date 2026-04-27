import { TGeneric } from "@/app/models/TGeneric"
import { useEffect, useState } from "react"
import { globalStyles_btn_list, globalStyles_overflow, globalStyles_table_list, globalStyles_tbody_list, globalStyles_td, globalStyles_th, globalStyles_thead_list, globalStyles_tr } from "../GlobalStyles"
import Pagination from "../Pagination/Pagination"


type Props = {
    generics: TGeneric[]
    setGeneric: React.Dispatch<React.SetStateAction<TGeneric>>
    genericDefined: string
}

export default function GenericList({ generics,
    setGeneric, genericDefined }: Props) {

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 8
    const totalPages = Math.ceil(generics.length / itemsPerPage)
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = generics.slice(indexOfFirstItem, indexOfLastItem)
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    useEffect(() => {
        setCurrentPage(1)
    }, [generics])

    function updateList(g: TGeneric) {
        setGeneric(g)
    }

    return <>
        <div className={globalStyles_overflow}>
            <table className={globalStyles_table_list}>
                <thead className={globalStyles_thead_list}>
                    <tr>
                        <th className={`${globalStyles_th} text-center`}>ID</th>
                        <th className={`${globalStyles_th} text-left`}>{genericDefined !== 'zipcodes' ? 'Descrição' : "CEP"}</th>

                        {genericDefined === 'subgroups' && <th className={`${globalStyles_th} text-left`}>IDGrupo</th>}
                        {genericDefined === 'subgroups' && <th className={`${globalStyles_th} text-left`}>Grupo</th>}

                        {(genericDefined === "countrys"
                            || genericDefined === 'states') && <th className={`${globalStyles_th} text-left`}>Acronimo</th>}
                        {genericDefined === "countrys" && <th className={`${globalStyles_th} text-left`}>DDI</th>}
                        {genericDefined === "countrys" && <th className={`${globalStyles_th} text-left`}>C País</th>}
                        {genericDefined === "countrys" && <th className={`${globalStyles_th} text-left`}>C Rec Federal</th>}

                        {genericDefined === 'citys' && <th className={`${globalStyles_th} text-left`}>IBGE</th>}
                        {genericDefined === 'citys' && <th className={`${globalStyles_th} text-left`}>Estado</th>}
                        {genericDefined === 'citys' && <th className={`${globalStyles_th} text-left`}>País</th>}

                        {genericDefined === 'zipcodes' && <th className={`${globalStyles_th} text-left`}>IDMunic</th>}
                        {genericDefined === 'zipcodes' && <th className={`${globalStyles_th} text-left`}>Munícipio</th>}
                        {genericDefined === 'zipcodes' && <th className={`${globalStyles_th} text-left`}>Estado</th>}

                        <th className={`${globalStyles_th} text-center`}>Ações</th>
                    </tr>
                </thead>
                <tbody className={globalStyles_tbody_list}>
                    {currentItems.map((g: TGeneric) => (
                        <tr key={g.id} className={globalStyles_tr}>
                            <td className={`${globalStyles_td} text-center`}>{g.id}</td>
                            <td className={`${globalStyles_td} text-left`}>{genericDefined !== 'zipcodes'? g.name : g.code}</td>

                            {genericDefined === 'subgroups' && <td className={`${globalStyles_td} text-left`}>{g.group?.id}</td>}
                            {genericDefined === 'subgroups' && <td className={`${globalStyles_td} text-left`}>{g.group?.name}</td>}

                            {(genericDefined === 'countrys'
                                || genericDefined === 'states') && <td className={`${globalStyles_td} text-left`}>{g.acronym}</td>}
                            {genericDefined === 'countrys' && <td className={`${globalStyles_td} text-left`}>{g.ddi}</td>}
                            {genericDefined === 'countrys' && <td className={`${globalStyles_td} text-left`}>{g.codeCountry}</td>}
                            {genericDefined === 'countrys' && <td className={`${globalStyles_td} text-left`}>{g.codeRevenue}</td>}

                            {genericDefined === 'citys' && <td className={`${globalStyles_td} text-left`}>{g.codeIbge}</td>}
                            {genericDefined === 'citys' && <td className={`${globalStyles_td} text-left`}>{g.state?.acronym}</td>}
                            {genericDefined === 'citys' && <td className={`${globalStyles_td} text-left`}>{g.country?.acronym}</td>}

                            {genericDefined === 'zipcodes' && <td className={`${globalStyles_td} text-left`}>{g.city?.id}</td>}
                            {genericDefined === 'zipcodes' && <td className={`${globalStyles_td} text-left`}>{g.city?.name}</td>}
                            {genericDefined === 'zipcodes' && <td className={`${globalStyles_td} text-left`}>{g.city?.state.acronym}</td>}


                            <td className={`${globalStyles_td} text-center`}><a href="#up-generic"
                                onClick={() => updateList(g)}
                                className={globalStyles_btn_list}
                            >Atualizar</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <Pagination
            props={generics}
            setCurrentPage={setCurrentPage}
            pageNumbers={pageNumbers}
            currentPage={currentPage}
            indexOfLastItem={indexOfLastItem}
        />
    </>

}