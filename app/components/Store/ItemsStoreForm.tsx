import { TItem, TResponseImages } from "@/app/models/TItem";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Pagination from '../Pagination/Pagination';

type Props = {
    items: TItem[]
    setItemsSale: Function
    msg: string
    handleAmount: number
    responseImages: TResponseImages[]
}

export default function ITemsStoreForm({
    items, setItemsSale, msg, handleAmount, responseImages
}: Props) {

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 36
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
            <div className="bg-transparent p-1 rounded-2xl shadow-lg flex flex-col justify-between">
                <main className="min-h-screen bg-gray-400 text-white p-1 rounded-2xl shadow-lg">
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-1">
                        {currentItems.map((item: TItem) => {
                            const image: TResponseImages[] = responseImages.filter(
                                (img) => img.idItem === item.id
                            );
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => insertItem(item)}
                                    className='bg-gray-50 text-black p-2 rounded-lg shadow-md hover:scale-105 transition duration-300 flex flex-col items-center justify-center'>
                                    <ul className=''>
                                        <li className='mb-3'>
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_API_IMG}/${item.id}/${image[0]?.fileName}`}
                                                alt={item.imagem}
                                                className="min-w-24 max-w-26 h-auto object-contain rounded-lg"
                                            />
                                        </li>
                                        <li className='flex  text-xs m-1 text-gray-800 '>
                                            {item.name} </li>
                                        <li className='flex p-1 m-1 text-blue-700'>
                                            R$ {item.priceMax.toFixed(2)}</li>
                                    </ul>
                                </button>
                            )
                        })}
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