import { TItem, TBrand, TsubGroup, TTaxGroup, TTypeItem, TItemClass, TUnitMeasure } from "@/app/models/TITem"
import ItemsList from "./ItemsList"

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
    items:TItem[]
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
    items
}: Props) {

    return <>
        <div className="max-w-3xl mx-auto bg-gray-600 p-8 rounded-2xl shadow-lg">
            <form className="space-y-6">
                <p>Incluir Item</p>
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
                <input className="w-full p-3 border rounded-lg"
                    type="text"
                    name='imagem'
                    value={children.imagem}
                    onChange={handleChange}
                    placeholder="Nome da imagem (jpg, png)"
                />
                <label>Marcas dos Items</label>
                <select
                    className="w-full p-3 border bg-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                    className="w-full p-3 border bg-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={children.brand.id || ''}
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
                    {subGroups.map((brand) => (
                        <option key={brand.id}
                            value={brand.id}>{brand.name}</option>
                    ))}
                </select>
                <label>Tabelas de Tributações dos Items</label>
                <select
                    className="w-full p-3 border bg-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                    className="w-full p-3 border bg-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                    className="w-full p-3 border bg-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                    className="w-full p-3 border bg-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                {msg && <p>{msg}</p>}
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
                >{children.id === 0 ? "Registrar Item" :
                    "Atualizar Item"}
                </button>
            </form>
        </div>
        <ItemsList
        items={items}
        setChildren={setChildren}
        />
    </>
}