import { TBranch, TPerson } from "./TPerson"
import { TSale } from "./TSale"
import { TUser } from "./TUser"

export type TAccountsReceivable = { // Contas a Receber
    id: number
    createdAt: Date
    updatedAt: Date | null// ultimo registro de atualização do Titulo
    idBranch: Pick<TBranch, 'id'>
    idUser: Pick<TUser, 'id'>
    idPayer: Pick<TPerson, 'id'> // pagador
    idSale: Pick<TSale, 'id'> // id da venda relacionada ao Titulo   
    value: number // valor do Titulo
    receivedValue: number // valor recebido do Titulo
    balance: number // saldo do Titulo 
    dueDate: Date // data de vencimento
    description: string // descrição do Titulo
    situation: TSituationAccountsReceivable
    observations: string
    lateFee: number // multa por atraso
    interest: number // juros por atraso
    discount: number // desconto
    type: TPaymentAccountsReceivable
    idTypeOperation: number // id do tipo de operação
    DescriptionTypeOperation: string // descrição do tipo de operação
}

export type TSituationAccountsReceivable = 'OPEN' | 'PAID' | 'PENDING' | 'CANCELED'
export type TPaymentAccountsReceivable = 'CASH' | 'CREDIT' | 'DEBIT' | 'PIX' | 'OTHER' | 'TICKET' | "DUPLICATE" | 'BANKTRANSFER'