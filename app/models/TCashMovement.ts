import { TAccountsReceivable } from "./TAccountsReceivable";

enum MovementType {
    CREDIT,
    DEBIT
}

export type TCashMovement = {
    id?:number
    amount:number
    movementType:MovementType
    description:string
    movementDate:string
    balanceAfter:number
    accountsReceivable?:TAccountsReceivable
}