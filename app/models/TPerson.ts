import { DateTime } from "next-auth/providers/kakao"
import { TUser } from "./TUser"
import { TAddress } from "./TAddress"

export type TPerson = {
    id: number
    createdAt?: Date
    updatedAt?: Date
    typePerson: TypePerson
    groupPerson: TGroupPerson
    branch: TBranch
    user: TUser
    name: string
    age: number
    dateOfBirth: DateTime | Date | string
    gender: Gender
    cpf: string
    rg: string
    email: string
    phone: string
    cnpj: string
    inscricState: string
    address: TAddress
}

export enum TypePerson {
    FISICA,
    JURIDICA
}

export type TBranch = {
    id: number
    name: string
    //...
}

export enum Gender {
    MASCULINO,
    FEMININO,
    OUTRO
}

export type TGroupPerson = {
    id: number
    name: string
}