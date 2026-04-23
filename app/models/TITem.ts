export type TItem = {
    id: number
    createdAt?: Date
    updateAt?: Date
    name: string
    priceMax: number
    priceMin: number
    barCode: string
    imagem: string
    brand: TBrand
    subGroup: TsubGroup
    taxGroup: TTaxGroup //grupo de tributação
    typeItem: TTypeItem
    itemClass: TItemClass
    unitMeasure: TUnitMeasure
}

export type TBrand = {
    id: number
    name: string
}

export type Tgroup = {
    id: number
    name: string
}

export type TsubGroup = {
    id: number
    name: string
    group: Tgroup
}

export type TTaxGroup = { // Grupo de tributação
    id: number
    name: string
    taxationTable: TTaxationTable
}

type TTaxationTable = {
    id: number
    name: string
    // ...
}

export type TTypeItem = {
    id: number
    name: string
}

export type TItemClass = {
    id: number
    name: string
}

export type TUnitMeasure = { // unidade de medida ex: UN, PCT, KL
    id: number
    name: string
}