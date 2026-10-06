"use client";

import { useEffect, useRef, useState } from "react";
import StoreForm from "@/app/components/Store/StoreForm";
import { TItem, TResponseImages } from "@/app/models/TItem";

import { useRouter } from "next/navigation";
import { loadHandle } from "@/app/lib/handleApi";
import BannerForm from "@/app/components/Banner/BannerForm";

export default function Store() {
  const router = useRouter();
  const [searchItemName, setSearchITemName] = useState("");
  const [items, setItems] = useState<TItem[]>([]);
  const [responseImages, setResponseImages] = useState<TResponseImages[]>([]);

  useEffect(() => {
    loadHandle("permitAll()", setResponseImages, "images", router);
  }, []);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  function toogleStrings() {
    const strings = process.env.NEXT_PUBLIC_TOOGLE_STRINGS?.split(",") ?? [];
    let i = 0;
    intervalRef.current = setInterval(() => {
      setSearchITemName(strings[i]);
      i = (i + 1) % strings.length;
    }, 6000);
  }

  useEffect(() => {
    toogleStrings();
    return () => stopAlternating();
  }, []);

  function stopAlternating() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

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

        /**Filtrar itens que não são do tipo 3 Serviços */
        setItems(data.filter((item) => item.typeItem.id === 1));
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
      <BannerForm />
      <StoreForm
        searchItemName={searchItemName}
        items={items}
        setSearchITemName={setSearchITemName}
        setItemsSale={setItems}
        responseImages={responseImages}
        stopAlternating={stopAlternating}
      />
    </>
  );
}
