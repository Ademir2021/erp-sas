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
         <main className="min-h-screen bg-gray-900 text-white p-10">
            <div className="text-3xl font-bold text-center mb-10">
                  <input
                        className="mb-3 w-full p-3 border rounded-lg"
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