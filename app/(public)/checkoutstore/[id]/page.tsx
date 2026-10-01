"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import { TItem, TResponseImages } from "@/app/models/TItem";
import CheckoutStoreForm from "@/app/components/Store/CheckoutStoreForm";
import { useRouter } from "next/navigation";
import { TItemsSale } from "@/app/models/TSale";
import { loadHandle } from "@/app/lib/handleApi";
import { LoadLocalStorge } from "../helpers/loadLocalStorage";

export default function CheckoutStorePage() {
  const router = useRouter();
  
  const [sucess, setSucess] = useState("");
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

  const loadLocalStorage = new LoadLocalStorge();

  useEffect(() => {
    loadHandle("permitAll()", setResponseImages, "images", router);
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
    loadLocalStorage.loadsetLocalStorage(setItemsSale);
  }, []);

  useEffect(() => {
    loadLocalStorage.loadgetLocalStorage(itemsSale);
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
    setSucess("Item adicionado com sucesso.")
    handleItemsSale();
    setTimeout(()=>{
      setSucess("")
    },2000)
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
        sucess={sucess}
      />
    </>
  );
}
