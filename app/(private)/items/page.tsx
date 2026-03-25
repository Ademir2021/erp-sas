'use client'

import { useEffect, useState } from "react";
import ItemsForm from "@/app/components/Items/ItemsForm";
import { TBrand, TItem, TItemClass, TsubGroup, TTaxGroup, TTypeItem, TUnitMeasure } from "@/app/models/TITem";
import { TUser } from "@/app/models/TUser";
import { useRouter } from 'next/navigation'
import { getUser } from "@/app/lib/auth";
import { loadHandle } from "@/app/lib/handleApi";

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
        loadHandle(token, setBrands, 'brands')
        loadHandle(token, setSubGroups, 'subgroups')
        loadHandle(token, setTaxGroups, 'taxgroups')
        loadHandle(token, setTypeItems, 'typeitems')
        loadHandle(token, setItemsClasses, 'itemsclasses')
        loadHandle(token, setUnitMeasures, 'unitmeasures')
         loadHandle(token, setItems, 'item')
    }, [user]);

     async function updateItem(item: TItem) {
       
        const ITEM_USER:any[] = [item, user]

            const res = await fetch('/api/item', {
                method: 'PUT',
                body: JSON.stringify(ITEM_USER),
            })
    
            const resp: any = await res.json()
    
            if (!res.ok) {
                setMsg(`Erro ao atualizar Pessoa: ${resp.error}`)
                return
            }
            router.push('/item')
            setMsg(`${resp.data.message} ID: ${resp.data.id} : ${resp.success}`)
            router.refresh()
        }

     async function saveItem(item: TItem) {

           const ITEM_USER:any[] = [item, user]
        
            const res = await fetch('/api/item', {
                method: 'POST',
                body: JSON.stringify(ITEM_USER),
            })
    
            if (!res.ok) {
                setMsg(`Erro ao registrar Item: ${JSON.stringify(res)}`)
                return
            }
    
            router.push('/item')
            setMsg('Item registrado com sucesso')
            router.refresh()
        }

    function handleSubmit(e:Event){
        e.preventDefault()
        item.id === 0 ? saveItem(item) : updateItem(item)
    }

    return <>
    <p>{JSON.stringify(item)}</p>
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