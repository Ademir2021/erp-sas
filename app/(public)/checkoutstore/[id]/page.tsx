"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TItem, TResponseImages } from "@/app/models/TItem";
import CheckoutStoreForm from "@/app/components/Store/CheckoutStoreForm";
import { userAuth } from "@/app/lib/userAuth";
import { useRouter } from 'next/navigation';
import { loadHandle } from "@/app/lib/handleApi";


export default function CheckoutStorePage() {
    const router = useRouter()
    const { user } = userAuth();
    const [items, setItems] = useState<TItem[]>([])
    const [responseImages, setResponseImages] = useState<TResponseImages[]>([])
    const [item] = useState<TItem>({
        name: "Item não encontrado",
        priceMax: 0,
        imagem: "N/A",
        subGroup: {
            name: "N/A",
            group: {
                name: "N/A"
            }
        }
    } as any)
    const params = useParams();
    const res = params.id as keyof typeof items;

    useEffect(() => {
        const token = user?.token as string
        loadHandle(token, setResponseImages, 'images', router)
    }, [user]);

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

    return (
        <CheckoutStoreForm
            item={items[0] || item}
            responseImages={responseImages}
        />
    )
}