'use client'

import { useEffect, useState } from "react"
import StoreForm from "@/app/components/Store/StoreForm"
import { TItem, TResponseImages } from "@/app/models/TItem"
import { userAuth } from "@/app/lib/userAuth"
import { useRouter } from 'next/navigation';
import { loadHandle } from "@/app/lib/handleApi";

export default function Store() {

    const router = useRouter()

    const [searchItemName, setSearchITemName] = useState("")
    const [items, setItems] = useState<TItem[]>([])
    const [responseImages, setResponseImages] = useState<TResponseImages[]>([])

    const { user } = userAuth();

    useEffect(() => {
        const token = user?.token as string
        loadHandle(token, setResponseImages, 'images', router)
    }, [user]);

    useEffect(() => {
        async function searchItemsByName() {
            const token = user?.token
            const params = new URLSearchParams({
                name: searchItemName
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
    }, [user, searchItemName])

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
    )
}