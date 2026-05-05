
type Props = {
    itemsPerPage: number
    setItemsPerPage: React.Dispatch<React.SetStateAction<number>>
}

export default function ItemsPerPage({ itemsPerPage, setItemsPerPage }: Props) {

    return (
        <div className="flex justify-center items-center gap-2 mb-1">
            <label className="text-sm"> Items por página:</label>
            <input
                type="number"
                min={1}
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value || 1))}
                className="w-16 border border-black rounded-md px-2 py-1.5 text-sm
      text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
      focus:border-blue-500 transition duration-200" />
        </div>
    )
}