import { TAccountsReceivable } from "./TAccountsReceivable"
import { TItem } from "./TITem"
import { TBranch, TPerson } from "./TPerson"
import { TUser } from "./TUser"

export type TSale = {
    id?: number
    branch: TBranch
    user: TUser
    person: Pick<TPerson, 'id'>
    discount: number
    itemsSale: TItemsSale[]
    operationSale:TOperationSale
    tSale: number
    accountsReceivable?: TAccountsReceivable[] //Contas a Receber geradas pela venda
}

export type TItemsSale = {
    item: TItem
    amount: number
    price: number
    tItem?: number
}

export type TOperationSale = {
    id: number
    description: string
    type:string
    controlsStock:boolean
    generateFinancial:boolean
    allowDiscount:boolean
    updateCost:boolean
    requiresInvoice:boolean
    isReturn:boolean
    cfop:string
    defaultNature:string
    active:boolean
}

export type TCreditCart = {
    public_key: string
    holder: string
    number: string
    ex_month: string
    ex_year: string
    secure_code: string
    encrypted: string
    installments:number
    payment:number 
}