import { TItem, TResponseImages } from "@/app/models/TItem"
import { globalStyles_btn_list, globalStyles_overflow, globalStyles_table_list, globalStyles_tbody_list, globalStyles_td, globalStyles_th, globalStyles_thead_list, globalStyles_tr } from "../GlobalStyles"
import { useEffect, useState } from "react"
import Pagination from "../Pagination/Pagination"
import CloseForm from "../CloseForm"


type Props = {
    items: TItem[]
    setChildren: Function
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>
    responseImages: TResponseImages[]
    handleDeleteImage: (id: number) => void;
}

export default function ItemsList({
    items,
    setChildren,
    setShowForm,
    responseImages,
    handleDeleteImage
}: Props) {

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 8
    const totalPages = Math.ceil(items.length / itemsPerPage)
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem)
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    // const [showFormImg, setShowFormImg] = useState(true)
    const [imagesSelected, setImagesSelected] = useState<TResponseImages[]>([]);
    const [showFormImg, setShowFormImg] = useState(false);

    useEffect(() => {
        setCurrentPage(1)
    }, [items])

    function updateList(item: TItem) {
        setChildren(item)
        setShowForm(true)
    }

    const handleShowImages = (idItem: number) => {
        const images = responseImages.filter(
            (img) => img.idItem === idItem
        );

        setImagesSelected(images);
        setShowFormImg(true);
    };

    return <>


        <div className={globalStyles_overflow}>
            <table className={globalStyles_table_list}>
                <thead className={globalStyles_thead_list}>
                    <tr>
                        <th className={`${globalStyles_th} text-center`}>ID</th>
                        <th className={`${globalStyles_th} text-center`}>Imagens</th>
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
                    {currentItems.map((item: TItem) => (
                        <tr key={item.id} className={globalStyles_tr}>
                            <td className={`${globalStyles_td} text-center`}>{item.id}</td>
                            <td className={`${globalStyles_td} text-center`}>
                                {(() => {
                                    const image = responseImages.find(
                                        (img) => img.idItem === item.id
                                    );

                                    return image ? (
                                        <button
                                            className="cursor-pointer"
                                            onClick={() => handleShowImages(item.id)}
                                        >
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_API_IMG}/${image.idItem}/${image.fileName}`}
                                                alt={item.name}
                                                className="w-16 h-16 object-contain mx-auto rounded border"
                                            />
                                        </button>
                                    ) : (
                                        <span>Sem imagem</span>
                                    );
                                })()}

                                {showFormImg && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 sm:p-5">

                                        <div className="bg-black text-white p-3 sm:p-4 rounded-lg shadow-lg
w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl
max-h-[85vh] flex flex-col">

                                            {/* Cabeçalho */}
                                            <div className="flex justify-end mb-3 shrink-0">
                                                <CloseForm setCloseForm={setShowFormImg} />
                                            </div>

                                            {/* Galeria */}
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2
overflow-y-auto min-h-0">

                                                {imagesSelected.map((image) => (
                                                    <div
                                                        key={image.id}
                                                        className="relative flex items-center justify-center
bg-white/10 rounded-lg border border-gray-600 p-1
group overflow-hidden"
                                                    >
                                                        <img
                                                            src={`${process.env.NEXT_PUBLIC_API_IMG}/${image.idItem}/${image.fileName}`}
                                                            alt="Imagem do produto"
                                                            className="w-full h-20 sm:h-24 md:h-28 object-contain"
                                                        />

                                                        <button
                                                            type="button"
                                                            onClick={() => handleDeleteImage(image.id)}
                                                            title="Remover imagem"
                                                            className="absolute top-1 right-1
bg-red-600 hover:bg-red-700
text-white rounded-full
w-7 h-7 flex items-center justify-center
shadow-md transition-all duration-200
hover:scale-110 cursor-pointer"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={2}
                                                                stroke="currentColor"
                                                                className="w-4 h-4"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M6 7h12m-10 0V5h8v2m-9 0 1 13h8l1-13M10 11v5m4-5v5"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                ))}

                                            </div>

                                            {/* Rodapé */}
                                            <div className="text-center text-xs text-gray-400 mt-3 shrink-0">
                                                {imagesSelected.length} imagens cadastradas
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </td>
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

        <Pagination
            props={items}
            setCurrentPage={setCurrentPage}
            pageNumbers={pageNumbers}
            currentPage={currentPage}
            indexOfLastItem={indexOfLastItem}
        />
    </>
}