"use client";

import { useEffect, useState } from "react";
import StoreForm from "@/app/components/Store/StoreForm";
import { TItem, TResponseImages } from "@/app/models/TItem";

import { useRouter } from 'next/navigation'
import { loadHandle } from "@/app/lib/handleApi";

export default function Store() {
  const router = useRouter()
  const [searchItemName, setSearchITemName] = useState("");
  const [items, setItems] = useState<TItem[]>([]);
  const [responseImages, setResponseImages] = useState<TResponseImages[]>([]);

  useEffect(() => {
    loadHandle('permitAll()', setResponseImages, 'images', router)
  }, []);

  useEffect(() => {
    async function searchItemsByName() {
      const params = new URLSearchParams({
        name: searchItemName,
      });
      try {
        const response = await fetch(`/api/itemsale?${params.toString()}`, {
          method: "GET",
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
        const data: TItem[] = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Erro na requisição:", error);
        setItems([]);
      }
    }
    setItems([]);
    // Evita buscar quando estiver vazio
    if (searchItemName.trim()) {
      searchItemsByName();
    }
  }, [searchItemName]);

  return (
    <>
      <StoreForm
        searchItemName={searchItemName}
        items={items}
        setSearchITemName={setSearchITemName}
        setItemsSale={setItems}
        responseImages={responseImages}
      />
    </>
  );
}
