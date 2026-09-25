import { TItem, TResponseImages } from "@/app/models/TItem";
import ITemsStoreForm from "./ItemsStoreForm";

type Props = {
  searchItemName: string;
  items: TItem[];
  setSearchITemName: Function;
  setItemsSale: Function;
  responseImages: TResponseImages[];
};

export default function StoreForm({
  searchItemName,
  items,
  setSearchITemName,
  setItemsSale,
  responseImages,
}: Props) {
  return (
    <>
      <main className="min-h-screen bg-gray-300 text-white p-6">
        <div className="text-center mb-3">
          <input
            className="mb-3 w-full p-2 border text-black
border-gray-400 rounded-b-sm focus:outline-none focus:ring-2
focus:ring-blue-100 focus:border-blue-500"
            value={searchItemName || ""}
            type="search"
            placeholder="Buscar produtos marcas e muito mais ..."
            autoFocus
            onChange={(e) => setSearchITemName(e.target.value)}
          />
        </div>
        <ITemsStoreForm
          items={items}
          setItemsSale={setItemsSale}
          responseImages={responseImages}
        />
      </main>
    </>
  );
}
