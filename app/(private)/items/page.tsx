'use client'

import { useEffect, useState } from "react";
import ItemsForm from "@/app/components/Items/ItemsForm";
import { TBrand, TItem, TItemClass, TResponseImages, TsubGroup, TTaxGroup, TTypeItem, TUnitMeasure } from "@/app/models/TItem";
import { useRouter } from 'next/navigation'
import { loadHandle } from "@/app/lib/handleApi";
import { TResponseMessage } from "@/app/models/TMessage";
import { userAuth } from "@/app/lib/userAuth";

export default function Items() {

    const router = useRouter()
    const { user } = userAuth();
    const [msg, setMsg] = useState('')
    const [items, setItems] = useState<TItem[]>([])
    const [brands, setBrands] = useState<TBrand[]>([])
    const [subGropus, setSubGroups] = useState<TsubGroup[]>([])
    const [taxGroups, setTaxGroups] = useState<TTaxGroup[]>([])
    const [typeItems, setTypeItems] = useState<TTypeItem[]>([])
    const [itemsClasses, setItemsClasses] = useState<TItemClass[]>([])
    const [unitMeasures, setUnitMeasures] = useState<TUnitMeasure[]>([])
    const [responseImages, setResponseImages] = useState<TResponseImages[]>([])
    const initialItem: TItem = {
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
        unitMeasure: { id: 0, name: '' },
        images: []
    }
    const [item, setItem] = useState<TItem>(initialItem)
    const [images, setImages] = useState<File[]>([]);

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setItem({ ...item, [name]: value })
    }

    function clearFields() {
        setItem({ ...initialItem })
    }

    useEffect(() => {
        const token = user?.token as string
        loadHandle(token, setBrands, 'brands', router)
        loadHandle(token, setSubGroups, 'subgroups', router)
        loadHandle(token, setTaxGroups, 'taxgroups', router)
        loadHandle(token, setTypeItems, 'typeitems', router)
        loadHandle(token, setItemsClasses, 'itemsclasses', router)
        loadHandle(token, setUnitMeasures, 'unitmeasures', router)
        loadHandle(token, setItems, 'item', router)
        loadHandle(token, setResponseImages, 'images', router)
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

    function formDataImages(item: TItem) {
        const formData = new FormData();
        const itemData = {
            ...item,
            images: undefined,
        };
        formData.append(
            "item",
            new Blob(
                [JSON.stringify(itemData)],
                {
                    type: "application/json",
                }
            )
        );
        if (item.images && item.images.length > 0) {
            item.images.forEach((image) => {
                formData.append("images", image);
            });
        }
        return formData;
    }

    async function saveItem(item: TItem) {
        try {
            const formData = formDataImages(item)
            const res = await fetch("/api/item", {
                method: "POST",
                body: formData,
            });
            const resp: TResponseMessage = await res.json();
            if (!res.ok) {
                setMsg(
                    `Erro ao registrar Item: ${resp?.details || resp?.error || "Erro desconhecido"
                    }`
                );
                return;
            }
            setMsg(
                `${resp.data.message} Name: ${resp.data.name} : ${resp.success}`
            );
            router.push("/items");
            router.refresh();

        } catch (error) {
            console.error("Erro ao salvar item:", error);
            setMsg(
                `Erro ao registrar Item: ${error instanceof Error
                    ? error.message
                    : "Erro desconhecido"
                }`
            );
        }
    }

    function valFields(item: TItem) {
        const missing: string[] = [];
        if (item.name === "") missing.push('Nome');
        if (item.priceMax === 0) missing.push('Preço Max');
        if (item.priceMin === 0) missing.push('Preço Min');
        if (item.barCode === "") missing.push('Código de Barras');
        if (item.imagem === "") missing.push('Imagem');
        if (item.brand.id === 0) missing.push('Marca');
        if (item.subGroup.id === 0) missing.push('Sub Grupo');
        if (item.taxGroup.id === 0) missing.push('Grupo de Tributação');
        if (item.typeItem.id === 0) missing.push('Tipo');
        if (item.itemClass.id === 0) missing.push('Classe');
        if (item.unitMeasure.id === 0) missing.push('UN de Medidas');
        if (missing.length === 0) {
            return true;
        }
        return 'Falta preencher os campos: ' + missing.join(', ') + '.';
    }

    function handleSubmit(e: Event) {
        e.preventDefault()
        if (valFields(item) === true) {
            item.id === 0 ? saveItem(item) : updateItem(item)
            clearFields()
        } else {
            setMsg(valFields(item) as any)
        }
    }

    return <>
        {/* <span>{JSON.stringify(item.images)}</span> */}
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
            images={images}
            setImages={setImages}
            responseImages={responseImages}
        >
            {item}
        </ItemsForm>
    </>

}