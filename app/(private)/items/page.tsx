'use client'

import { useEffect, useState } from "react";
import ItemsForm from "@/app/components/Items/ItemsForm";
import { TBrand, TItem, TItemClass, TsubGroup, TTaxGroup, TTypeItem, TUnitMeasure } from "@/app/models/TITem";
import { TUser } from "@/app/models/TUser";
import { getUser } from "@/app/lib/auth";
import { loadHandle } from "@/app/lib/handleApi";

export default function Items() {

    const [user, setUser] = useState<TUser | null>(null)
    const [msg, setMsg] = useState('')
    // const [items, setItems] = useState<TItem[]>([])
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
    }, [user]);

    return <>
        {/* <pre>{JSON.stringify(item)}</pre> */}
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
        >
            {item}
        </ItemsForm>
    </>

}