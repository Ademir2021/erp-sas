'use client'

import { useEffect, useState } from "react"
import { TItemsSale, TSale } from "@/app/models/TSale"
import { TUser, UserRole } from "@/app/models/TUser"
import SaleForm from "@/app/components/Sale/SaleForm"
import { TItem } from "@/app/models/TITem"
import { getUser } from "@/app/lib/auth"


export default function Sales() {
    const [searchItemName, setSearchITemName] = useState('!')
    const [user, setUser] = useState<TUser>()
    const [items, setItems] = useState<TItem[]>([])
    const [itemsSale, setItemsSale] = useState<TItemsSale[]>([])
    const [sale, setSale] = useState<TSale>({
        branch: { id: 1, name: '' },
        user: {
            id: 0,
            login: '',
            password: '',
            roles: UserRole.ADMIN,
            token: ''
        },
        person: { id: 1 },
        discount: 0,
        itemsSale: []
    })


    useEffect(() => {
        async function loadUser() {
            const user = await getUser()
            setUser(user)
            if (user) {
                const userSale: TUser = {
                    id: user.id,
                    login: user.login,
                    roles: user.roles,
                    token: ''
                }
                sale.user = userSale
            }
        }
        loadUser()
    }, [])

    useEffect(() => {
        async function searchItemsByName() {
            const token = user?.token
            const params = new URLSearchParams({
                name: searchItemName,
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

    function loadSale(sale: TSale) {
        if (itemsSale.length > 0)
            sale.itemsSale = itemsSale
        console.log(sale)
    }

    function hanldeSubmit(e: Event) {
        e.preventDefault()
        loadSale(sale)

    }

    return <>
        {/* <div>{JSON.stringify(sale)}</div> */}
        <SaleForm
            setSearchITemName={setSearchITemName}
            items={items}
            itemsSale={itemsSale}
            setItemsSale={setItemsSale}
            handleSubmit={hanldeSubmit}
        >
            {sale}
        </SaleForm>
    </>
}