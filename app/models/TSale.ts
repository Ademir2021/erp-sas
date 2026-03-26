import { TItem } from "./TITem"
import { TBranch, TPerson } from "./TPerson"
import { TUser } from "./TUser"

export type TSale = {
    branch: TBranch
    user: TUser
    person: Pick<TPerson, 'id'>
    discount: number
    itemsSale: TItemsSale[]
}

export type TItemsSale = {
    item: TItem
    amount: number
    price: number
    tItem?:number
}
