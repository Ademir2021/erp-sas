import { TItem } from "@/app/models/TItem"
import ITemsStoreForm from "./ItemsStoreForm"

type Props ={
    searchItemName:string
    items: TItem[]
    setSearchITemName:Function
    setItemsSale:Function
}

export default function StoreForm({searchItemName,
    items,
    setSearchITemName,
    setItemsSale
}:Props) {

    const handleAmount = 1

console.log(items)
    return(
        <>
         <main className="min-h-screen bg-gray-900 text-white p-6">
            <div className="text-center mb-3">
                  <input
                        className="mb-3 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={searchItemName || ""}
                        type="search"
                        placeholder="Buscar Produtos ..."
                        autoFocus
                        onChange={(e) => setSearchITemName(e.target.value)}
                    />
            </div>

                 <ITemsStoreForm
                items={items}
                setItemsSale={setItemsSale}
                msg={'msg'}
                handleAmount={handleAmount}
            />
             
        </main>
        </>
    )
}