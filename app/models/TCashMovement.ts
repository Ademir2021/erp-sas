export type TCashMovement = {
    id?: number
    amount: string
    movementType: MovementType
    description: string
    movementDate: Date
    balanceAfter: number // proximo saldo
    accountsReceivable?: number | null
};
enum MovementType {
    CREDIT,
    DEBIT
}