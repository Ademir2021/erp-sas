"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { LoadLocalStorge } from "@/app/(public)/checkoutstore/helpers/loadLocalStorage";

export default function CardIconItems() {
  const router = useRouter();
  const [itemsSale, setItemsSale] = useState([]);
  const loadLocalStorage = new LoadLocalStorge();

  // useEffect(() => {
  //   loadLocalStorage.loadsetLocalStorage(setItemsSale);
  // }, []);

  return (
    <div className="flex-1 flex justify-end mr-8">
      <button
        type="button"
        onClick={() => router.push("/checkoutstep")}
        className="flex items-center cursor-pointer"
        aria-label={`Carrinho com ${itemsSale.length} itens`}
      >
        <span className="flex absolute text-blue-100 font-semibold">
          {itemsSale.length > 0 && itemsSale.length}
        </span>
        <div className="text-gray-400 ml-2">
          <ShoppingCartCheckoutIcon titleAccess="Carrinho de compras" />
        </div>
      </button>
    </div>
  );
}
