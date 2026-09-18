"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { TItem } from "@/app/models/TItem";
import CheckoutStoreForm from "@/app/components/Store/CheckoutStoreForm";


export default function CheckoutStorePage() {

    const [items, setItems] = useState<TItem[]>([])

      const params = useParams();
      const router = useRouter();
      const res = params.id as keyof typeof items;
      
    console.log("params", res)
    return(
        <CheckoutStoreForm/>
    )
}