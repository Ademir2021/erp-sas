"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TItem, TResponseImages } from "@/app/models/TItem";
import CheckoutStoreForm from "@/app/components/Store/CheckoutStoreForm";
import { useRouter } from "next/navigation";
import { TItemsSale } from "@/app/models/TSale";

export default function CheckoutStorePage() {
  const router = useRouter();

  const [items, setItems] = useState<TItem[]>([]);
  const [responseImages, setResponseImages] = useState<TResponseImages[]>([]);
  const [item] = useState<TItem>({
    name: "Item não encontrado",
    priceMax: 0,
    imagem: "N/A",
    subGroup: {
      name: "N/A",
      group: {
        name: "N/A",
      },
    },
  } as any);

  const [amount, setAmount] = useState(1);
  const [itemsSale, setItemsSale] = useState<TItemsSale[]>([]);

  const params = useParams();
  const res = params.id as keyof typeof items;

  useEffect(() => {
    async function imagesItems() {
      try {
        const response = await fetch("/api/images", {
          method: "GET",
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
        const data: TResponseImages[] = await response.json();
        setResponseImages(data);
      } catch (error) {
        console.error("Erro ao buscar imagens:", error);
        setResponseImages([]);
      }
    }
    imagesItems();
  }, []);

  useEffect(() => {
    async function searchItemsByName() {
      const params = new URLSearchParams({
        name: res.toString(),
      });
      try {
        const response = await fetch(`/api/itemsale?${params.toString()}`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
        const data: TItem[] = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    }
    setItems([]);
    searchItemsByName();
  }, [res]);

  useEffect(() => {
    const savedItems = localStorage.getItem("itemsSale");
    if (savedItems) {
      setItemsSale(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    if (itemsSale.length > 0) {
      localStorage.setItem("itemsSale", JSON.stringify(itemsSale));
    } else {
      localStorage.removeItem("itemsSale");
    }
  }, [itemsSale]);

  function handleItemsSale() {
    const newItemSale: TItemsSale = {
      item: {
        id: items[0]?.id,
        name: items[0]?.name,
      } as any,
      amount: amount,
      price: items[0].priceMax,
      tItem: items[0].priceMax * amount,
    };
    setItemsSale((prev: TItemsSale[]) => {
      const exists = prev.find(
        (itemSale) => itemSale.item.id === newItemSale.item.id,
      );
      if (exists) {
        return prev.map((itemSale) =>
          itemSale.item.id === newItemSale.item.id
            ? { ...itemSale, amount: amount, tItem: newItemSale.tItem }
            : itemSale,
        );
      }
      return [...prev, newItemSale];
    });
  }

  function buyNow() {
    handleItemsSale();
    router.push("/checkoutstep");
  }
  function addToCart() {
    handleItemsSale();
  }
  return (
    <>
      {/* <pre className="text-xs bg-gray-500 p-1 rounded overflow-auto">
{JSON.stringify(itemsSale, null, 2)}
</pre> */}
      <CheckoutStoreForm
        item={items[0] || item}
        responseImages={responseImages}
        buyNow={buyNow}
        addToCart={addToCart}
        amount={amount}
        setAmount={setAmount}
      />
    </>
  );
}
