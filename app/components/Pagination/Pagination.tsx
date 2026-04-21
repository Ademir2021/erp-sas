import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

type Props = {
    props: any[]
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    pageNumbers: number[]
    currentPage: number
    indexOfLastItem: number
}

export default function Pagination({
    props,
    setCurrentPage,
    pageNumbers,
    currentPage,
    indexOfLastItem
}: Props) {
    return <>
        {props.length > 5 && <div className="flex justify-center gap-2 mt-4">
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="cursor-pointer">
                <KeyboardArrowLeftIcon titleAccess='Anterior' /></button>

            <span className="px-3 py-1">
                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`cursor-pointer px-2 py-1 rounded ml-1
                        ${page === currentPage ? "bg-blue-600 text-black"
                                : "bg-transparent text-white hover:bg-gray-400"}`}>
                        {page}
                    </button>
                ))}
            </span>

            <button onClick={() => setCurrentPage(prev =>
                indexOfLastItem < props.length ? prev + 1 : prev)}
                className='cursor-pointer'>
                <KeyboardArrowRightIcon titleAccess='Próximo' />
            </button>
        </div>}
    </>
}