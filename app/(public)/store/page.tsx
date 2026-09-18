'use client'

import { useEffect, useState } from "react"
import StoreForm from "@/app/components/Store/StoreForm"
import { TItem } from "@/app/models/TItem"
import { userAuth } from "@/app/lib/userAuth"

export default function Store(){

       const [searchItemName, setSearchITemName] = useState("")
        const [items, setItems] = useState<TItem[]>([])

          const { user } = userAuth();

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

    return(
        <>
       <StoreForm
       searchItemName={searchItemName}
       items={items}
       setSearchITemName={setSearchITemName}
       setItemsSale={setItems}
       />
       </>
    )
}