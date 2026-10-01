"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

type TItemsSale = {
  id: number;
  amount: number;
};

export default function CardIconItems() {
  const router = useRouter();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    function updateQuantity() {
      const savedItems = localStorage.getItem("itemsSale");
      if (!savedItems) {
        setQuantity(0);
        return;
      }
      try {
        const items: TItemsSale[] = JSON.parse(savedItems);
        const total = items.reduce((acc, item) => acc + item.amount, 0);
        setQuantity(total);
      } catch (error) {
        console.error("Erro ao ler itemsSale:", error);
        setQuantity(0);
      }
    }
    // Carrega inicialmente
    updateQuantity();
    // Atualiza quando outro componente avisar
    window.addEventListener("itemsSaleUpdated", updateQuantity);
    return () => {
      window.removeEventListener("itemsSaleUpdated", updateQuantity);
    };
  }, []);

  return (
    <div className="flex-1 flex justify-end mr-8">
      <button
        type="button"
        onClick={() => router.push("/checkoutstep")}
        className="flex items-center cursor-pointer"
        aria-label={`Carrinho com ${quantity > 0 ? quantity : ''} itens`}
      >
        <span className="flex absolute text-blue-100 font-semibold">
          {quantity > 0 ? quantity : ''}
        </span>
        <div className="text-gray-400 ml-2">
          <ShoppingCartCheckoutIcon titleAccess="Carrinho de compras" />
        </div>
      </button>
    </div>
  );
}
