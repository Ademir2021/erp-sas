import { TItem } from "@/app/models/TItem";
import { TItemsSale } from "@/app/models/TSale";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Pagination from '../Pagination/Pagination';
// import AddIcon from '@mui/icons-material/Add';

type Props = {
    items: TItem[]
    setItemsSale: Function
    msg: string
    handleAmount: number
}

export default function ITemsStoreForm({
    items, setItemsSale, msg, handleAmount
}: Props) {

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6
    const totalPages = Math.ceil(items.length / itemsPerPage)
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem)
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);


    useEffect(() => {
        setCurrentPage(1)
    }, [items])

      const router = useRouter()

    function insertItem(item: TItem) {
        router.push(`/checkoutstore/${item.id}`)
    }

    return (
        <>
            <div className="bg-white p-1 rounded-2xl shadow-lg hover:scale-105 transition duration-300 flex flex-col justify-between">
                <main className="min-h-screen bg-gray-900 text-white p-2 rounded-2xl shadow-lg">
                    <div className="grid md:grid-cols-6 gap-2">
                        {currentItems.map((item: TItem) => (
                            <a href="#"
                                key={item.id}
                                onClick={() => insertItem(item)}
                                className='bg-gray-800 p-2 rounded-lg shadow-md hover:scale-105 transition duration-300 flex flex-col items-center justify-center'>
                                <ul className=''>
                                    <li className='mb-3'>
                                        {item.imagem ? (
                                            <img src={item.imagem} alt={item.imagem} className='w-8 h-8 rounded-full' />
                                        ) : (
                                            <div className='w-8 h-8 bg-gray-300 rounded-full' />
                                        )}
                                    </li>
                                    <li className=''>
                                        {item.name} </li>
                                    <li className=''>
                                        R$ {item.priceMax.toFixed(2)}</li>
                                </ul>
                            </a>
                        ))}
                    </div>
                </main>
            </div>
            <Pagination
                props={items}
                setCurrentPage={setCurrentPage}
                pageNumbers={pageNumbers}
                currentPage={currentPage}
                indexOfLastItem={indexOfLastItem}
            />
        </>
    )
}