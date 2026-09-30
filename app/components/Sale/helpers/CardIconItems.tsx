"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

export default function CardIconItems() {
  const router = useRouter();
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    function loadItemsSale() {
      const savedItems = localStorage.getItem("itemsSale");

      if (!savedItems) {
        setTotalItems(0);
        return;
      }
      const items = JSON.parse(savedItems);
      const total = items.reduce(
        (sum: number, item: any) => sum + Number(item.amount || 0),
        0,
      );
      setTotalItems(total);
    }
    loadItemsSale();
    window.addEventListener("itemsSaleUpdated", loadItemsSale);
    return () => {
      window.removeEventListener("itemsSaleUpdated", loadItemsSale);
    };
  }, []);

  return (
    <div className="flex-1 flex justify-end mr-8">
      <button
        type="button"
        onClick={() => router.push("/checkoutstep")}
        className="flex items-center cursor-pointer"
        aria-label={`Carrinho com ${totalItems} itens`}
      >
        <span className="text-yellow-400 font-semibold mr-1">{totalItems}</span>
        <ShoppingCartCheckoutIcon
          titleAccess="Carrinho de compras"
          color="warning"
        />
      </button>
    </div>
  );
}
