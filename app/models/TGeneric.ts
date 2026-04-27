import { TCity, TCountry, TState, TZipCode } from "./TAddress"
import { Tgroup } from "./TItem"

export type TGeneric = {
    id: number
    name: string
    code:string
    group:Tgroup
    acronym:string
    ddi:string
    codeCountry:string
    codeRevenue:string,
    codeIbge:string,
    country:TCountry
    state:TState
    city:TCity
    zipcode:TZipCode
}