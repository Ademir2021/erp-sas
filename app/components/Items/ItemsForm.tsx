import { TItem, TBrand, TsubGroup, TTaxGroup, TTypeItem, TItemClass, TUnitMeasure, TResponseImages } from "@/app/models/TItem"
import ItemsList from "./ItemsList"
import { useState } from "react"
import ShowForm from "../ShowForm"
import { globalStyles_form, globalStyles_select } from "../GlobalStyles"
import CloseForm from "../CloseForm"

type Props = {
    children: TItem
    handleChange: any
    setChildren: Function
    brands: TBrand[]
    subGroups: TsubGroup[]
    taxGroups: TTaxGroup[]
    typeItems: TTypeItem[]
    itemsClasses: TItemClass[]
    unitMeasures: TUnitMeasure[]
    msg: string
    handleSubmit: any
    items: TItem[]
    images: File[]
    setImages: Function
     responseImages:TResponseImages[]
}

export default function ItemsForm({
    children,
    handleChange,
    setChildren,
    brands,
    subGroups,
    taxGroups,
    typeItems,
    itemsClasses,
    unitMeasures,
    msg,
    handleSubmit,
    items,
    images,
    setImages,
    responseImages
}: Props) {

    const [showForm, setShowForm] = useState(false)

    return <>
        <ShowForm
            showForm={showForm}
            setShowForm={setShowForm}
        />
        {showForm && <div className={`${globalStyles_form} max-w-xl mx-auto`}>
            <CloseForm setCloseForm={setShowForm} />
            <form id="up-item" className="space-y-4 mt-[-28]">
                <p className="font-bold">{children.id === 0 ?
                    "Registar Item" :
                    "Atualizar Item :" + children.id}</p>
                <input className="w-full p-3 border rounded-lg"
                    type="text"
                    name='name'
                    value={children.name}
                    onChange={handleChange}
                    placeholder="Descrição do Item"
                />
                <input className="w-full p-3 border rounded-lg"
                    type="number"
                    name='priceMax'
                    value={children.priceMax || ''}
                    onChange={handleChange}
                    placeholder="Preço venda máximo"
                />
                <input className="w-full p-3 border rounded-lg"
                    type="number"
                    name='priceMin'
                    value={children.priceMin || ''}
                    onChange={handleChange}
                    placeholder="Preço venda mínimo"
                />
                <input className="w-full p-3 border rounded-lg"
                    type="text"
                    name='barCode'
                    value={children.barCode}
                    onChange={handleChange}
                    placeholder="Código de barras"
                />

                <div className="space-y-2">
                    <label className="font-semibold">
                        Imagens do Item
                    </label>
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        multiple
                        className="w-full p-3 border rounded-lg"
                        onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            setImages(files);
                            setChildren(prev => ({
                                ...prev,
                                images: files
                            }));
                        }}
                    />
                    {images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className="border rounded-lg p-2 bg-gray-50"
                                >
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt={`Imagem ${index + 1}`}
                                        className="w-full h-32 object-contain rounded"
                                    />
                                    <p className="text-xs text-gray-600 mt-1 truncate">
                                        {image.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <input className="w-full p-3 border rounded-lg"
                    type="text"
                    name='imagem'
                    value={children.imagem}
                    onChange={handleChange}
                    placeholder="Nome da imagem (jpg, png)"
                />

                <label>Marcas dos Items</label>
                <select
                    className={globalStyles_select}
                    value={children.brand.id || ''}
                    name="id"
                    onChange={(e) => setChildren({
                        ...children, brand: {
                            id: parseInt(e.target.value),
                            name: ''
                        }
                    })
                    }
                >
                    <option disabled value="">
                        Selecione a marca do Item ...
                    </option>
                    {brands.map((brand) => (
                        <option key={brand.id}
                            value={brand.id}>{brand.name}</option>
                    ))}
                </select>

                <label>SubGrupos dos Items</label>
                <select
                    className={globalStyles_select}
                    value={children.subGroup.id || ''}
                    name="id"
                    onChange={(e) => setChildren({
                        ...children, subGroup: {
                            id: parseInt(e.target.value),
                            name: '',
                        }
                    })
                    }
                >
                    <option disabled value="">
                        Selecione o subGrupo do Item ...
                    </option>
                    {subGroups.map((subGroup) => (
                        <option key={subGroup.id}
                            value={subGroup.id}>{subGroup.name}</option>
                    ))}
                </select>
                <label>Tabelas de Tributações dos Items</label>
                <select
                    className={globalStyles_select}
                    value={children.taxGroup.id || ''}
                    name="id"
                    onChange={(e) => setChildren({
                        ...children, taxGroup: {
                            id: parseInt(e.target.value),
                            name: '',
                        }
                    })
                    }
                >
                    <option disabled value="">
                        Selecione a Tabela de Tributação do Item ...
                    </option>
                    {taxGroups.map((taxGroup) => (
                        <option key={taxGroup.id}
                            value={taxGroup.id}>{taxGroup.name}</option>
                    ))}
                </select>

                <label>Tipos dos Items</label>
                <select
                    className={globalStyles_select}
                    value={children.typeItem.id || ''}
                    name="id"
                    onChange={(e) => setChildren({
                        ...children, typeItem: {
                            id: parseInt(e.target.value),
                            name: '',
                        }
                    })
                    }
                >
                    <option disabled value="">
                        Selecione o Tipo do Item ...
                    </option>
                    {typeItems.map((typeItem) => (
                        <option key={typeItem.id}
                            value={typeItem.id}>{typeItem.name}</option>
                    ))}
                </select>

                <label>Classes dos Items</label>
                <select
                    className={globalStyles_select}
                    value={children.itemClass.id || ''}
                    name="id"
                    onChange={(e) => setChildren({
                        ...children, itemClass: {
                            id: parseInt(e.target.value),
                            name: '',
                        }
                    })
                    }
                >
                    <option disabled value="">
                        Selecione a classe do Item ...
                    </option>
                    {itemsClasses.map((itemClass) => (
                        <option key={itemClass.id}
                            value={itemClass.id}>{itemClass.name}</option>
                    ))}
                </select>

                <label>Unidades de medidas dos Items</label>
                <select
                    className={globalStyles_select}
                    value={children.unitMeasure.id || ''}
                    name="id"
                    onChange={(e) => setChildren({
                        ...children, unitMeasure: {
                            id: parseInt(e.target.value),
                            name: '',
                        }
                    })
                    }
                >
                    <option disabled value="">
                        Selecione a unidade de medida do Item ...
                    </option>
                    {unitMeasures.map((unitMeasure) => (
                        <option key={unitMeasure.id}
                            value={unitMeasure.id}>{unitMeasure.name}</option>
                    ))}
                </select>
                <p className="text-gray-300 ">{msg && msg}</p>
                <a
                    href="#up-item"
                    type="submit"
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
                >{children.id === 0 ? "Registrar Item" :
                    "Atualizar Item"}
                </a>
            </form>
        </div>}
        <ItemsList
            items={items}
            setChildren={setChildren}
            setShowForm={setShowForm}
            responseImages={responseImages}
        />
    </>
}