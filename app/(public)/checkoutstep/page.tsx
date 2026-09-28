"use client";
import CheckoutStepForm from "@/app/components/Sale/ChecKoutStepForm";
import { loadHandle } from "@/app/lib/handleApi";
import { userAuth } from "@/app/lib/userAuth";
import { TResponseImages } from "@/app/models/TItem";
import { TItemsSale } from "@/app/models/TSale";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutStep() {

      const { user } = userAuth();
        const router = useRouter();

  const [itemsSale, setItemsSale] = useState<TItemsSale[]>([]);
   const [responseImages, setResponseImages] = useState<TResponseImages[]>([]);

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

    useEffect(() => {
      const token = user?.token as string;
      loadHandle(token, setResponseImages, "images", router);
    }, [user]);

  return (
    <>
    {/* {JSON.stringify(responseImages)} */}
      <CheckoutStepForm
      itemsSale={itemsSale}
      responseImages={responseImages}
      setItemsSale={setItemsSale}
      />
    </>
  );
}
