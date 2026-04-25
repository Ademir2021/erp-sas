export type TAddress = {
    id:number
    street:string
    number:string
    neighborhood:string
    complement:string
    zipCode?:TZipCode
    person?:any
}

export type TZipCode = {
    id:number
    code:string
    city?:TCity
}

type TCity = {
    id:number
    name:string
    codeIbge:string
    state:TState
    country: TCountry
}

type TState = {
    id:number
    name:string
    acronym:string // Ex: SP para São Paulo, RJ para Rio de Janeiro
}

export type TCountry = { //País
    id:number
    name:string
    acronym:string // Ex: BR, US, PT
    ddi:string // Ex: 55 para Brasil, 1 para Estados Unidos
    codeCountry:string
    codeRevenue:string // codigo da receita federal do país
    city:TCity
}