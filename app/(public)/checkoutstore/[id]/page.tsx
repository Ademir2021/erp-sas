"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { TItem } from "@/app/models/TItem";
import CheckoutStoreForm from "@/app/components/Store/CheckoutStoreForm";
import { userAuth } from "@/app/lib/userAuth";


export default function CheckoutStorePage() {

    const { user } = userAuth();

    const [items, setItems] = useState<TItem[]>([])

    const params = useParams();
    const router = useRouter();
    const res = params.id as keyof typeof items;

    useEffect(() => {
        async function searchItemsByName() {
            const token = user?.token
            const params = new URLSearchParams({
                name: res.toString()
            })
            try {
                if (!token) return
                const response = await fetch(`/api/itemsale?${params.toString()}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (!response.ok) {
                    throw new Error(`Erro: ${response.status}`)
                }
                const data: TItem[] = await response.json()
                setItems(data)
            } catch (error) {
                console.error("Erro na requisição:", error)
            }
        }
        setItems([])
        searchItemsByName()
    }, [user, res])

    // console.log("params", res)
    return (
        <>
            {/* <p>{JSON.stringify(items[0])}</p> */}
            <CheckoutStoreForm
                item={items[0] || {
                    name: "Item não encontrado",
                    priceMax: 0,
                    imagem: "N/A",
                    subGroup: {
                        name: "N/A",
                        group: {
                            name: "N/A"
                        }}
                }} />
        </>
    )
}