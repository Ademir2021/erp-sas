'use client'

import { useEffect, useState } from "react";
import ItemsForm from "@/app/components/Items/ItemsForm";
import { TBrand, TItem, TItemClass, TsubGroup, TTaxGroup, TTypeItem, TUnitMeasure } from "@/app/models/TItem";
import { TUser } from "@/app/models/TUser";
import { useRouter } from 'next/navigation'
import { getUser } from "@/app/lib/auth";
import { loadHandle } from "@/app/lib/handleApi";
import { TResponseMessage } from "@/app/models/TMessage";

export default function Items() {

    const router = useRouter()
    const [user, setUser] = useState<TUser | null>(null)
    const [msg, setMsg] = useState('')
    const [items, setItems] = useState<TItem[]>([])
    const [brands, setBrands] = useState<TBrand[]>([])
    const [subGropus, setSubGroups] = useState<TsubGroup[]>([])
    const [taxGroups, setTaxGroups] = useState<TTaxGroup[]>([])
    const [typeItems, setTypeItems] = useState<TTypeItem[]>([])
    const [itemsClasses, setItemsClasses] = useState<TItemClass[]>([])
    const [unitMeasures, setUnitMeasures] = useState<TUnitMeasure[]>([])
    const [item, setItem] = useState<TItem>({
        id: 0,
        name: '',
        priceMax: 0,
        priceMin: 0,
        barCode: '',
        imagem: '',
        brand: { id: 0, name: '' },
        subGroup: { id: 0, name: '', group: { id: 0, name: '' } },
        taxGroup: { id: 0, name: '', taxationTable: { id: 0, name: '' } },
        typeItem: { id: 0, name: '' },
        itemClass: { id: 0, name: '' },
        unitMeasure: { id: 0, name: '' }
    })

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setItem({ ...item, [name]: value })
    }

    useEffect(() => {
        async function loadUser() {
            const user = await getUser()
            setUser(user)
        }
        loadUser()
    }, [])

    useEffect(() => {
        const token = user?.token as string
        loadHandle(token, setBrands, 'brands', router)
        loadHandle(token, setSubGroups, 'subgroups', router)
        loadHandle(token, setTaxGroups, 'taxgroups', router)
        loadHandle(token, setTypeItems, 'typeitems', router)
        loadHandle(token, setItemsClasses, 'itemsclasses', router)
        loadHandle(token, setUnitMeasures, 'unitmeasures', router)
        loadHandle(token, setItems, 'item', router)
    }, [user]);

    async function updateItem(item: TItem) {

        const res = await fetch('/api/item', {
            method: 'PUT',
            body: JSON.stringify(item),
        })

        const resp: TResponseMessage = await res.json()

        if (!res.ok) {
            setMsg(`Erro ao atualizar Item: ${resp.error}`)
            return
        }
        router.push('/items')
        setMsg(`${resp.data.message} ID: ${resp.data.id} : ${resp.success}`)
        router.refresh()
    }

    async function saveItem(item: TItem) {

        const res = await fetch('/api/item', {
            method: 'POST',
            body: JSON.stringify(item),
        })

        const resp: TResponseMessage = await res.json()

        if (!res.ok) {
            setMsg(`Erro ao registrar Item: ${resp?.details}`)
            return
        }

        router.push('/items')
        setMsg(`${resp.data.message} Name: ${resp.data.name} : ${resp.success}`)
        router.refresh()
    }

    function handleSubmit(e: Event) {
        e.preventDefault()
        item.id === 0 ? saveItem(item) : updateItem(item)
    }

    return <>
        <ItemsForm
            handleChange={handleChange}
            setChildren={setItem}
            brands={brands}
            subGroups={subGropus}
            taxGroups={taxGroups}
            typeItems={typeItems}
            itemsClasses={itemsClasses}
            unitMeasures={unitMeasures}
            msg={msg}
            handleSubmit={handleSubmit}
            items={items}
        >
            {item}
        </ItemsForm>
    </>

}