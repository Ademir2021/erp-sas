import { TItem, TResponseImages } from "@/app/models/TItem";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

type Props = {
  items: TItem[];
  setItemsSale: Function;
  responseImages: TResponseImages[];
};

export default function ITemsStoreForm({ items, responseImages }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 36;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  const router = useRouter();

  function insertItem(item: TItem) {
    router.push(`/checkoutstore/${item.id}`);
  }

  return (
    <>
      <div className="bg-transparent p-1 rounded-2xl shadow-lg flex flex-col justify-between">
        <main className="min-h-screen bg-gray-400 text-white p-1 rounded-2xl shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-1">
            {currentItems.map((item: TItem) => {
              const image: TResponseImages[] = responseImages.filter(
                (img) => img.idItem === item.id,
              );
              return (
                <button
                  key={item.id}
                  onClick={() => insertItem(item)}
                  className="bg-gray-50 cursor-pointer text-black p-2 rounded-lg shadow-md hover:scale-105 transition duration-300 flex flex-col items-center justify-center"
                >
                  <ul className="">
                    <li className="mb-3">
                      <img
                        className="min-w-auto max-w-36 h-auto object-contain rounded-b-sm"
                        src={`${process.env.NEXT_PUBLIC_API_IMG}/${item.id}/${image[0]?.fileName}`}
                        alt={item.imagem}
                      />
                    </li>
                    <li className="flex-1 p-1 mb-1 text-left text-sm text-gray-700 ">
                      {item.name}
                    </li>
                    <li className="flex ml-1 text-gray-800 text-xs">
                      {item.priceMax > 50
                        ? `6x de R$ ${(item.priceMax / 6).toFixed(2)} sem juros`
                        : null}
                    </li>
                    <li className="flex ml-1 text-sm font-bold">
                      R$ {item.priceMax.toFixed(2)}
                    </li>
                    <li>
                      <span className="flex p-1 text-xs font-bold text-green-700">
                        Frete grátis
                      </span>
                    </li>
                  </ul>
                </button>
              );
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
  );
}
