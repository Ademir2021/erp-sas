import { Tgroup } from "./TItem"

export type TGeneric = {
    id: number
    name: string
    group:Tgroup
    acronym:string
    ddi:string
    codeCountry:string
    codeRevenue:string
}

/**{ //country
		"id": 1,
		"name": "Brasil",
		"acronym": "BRA",
		"ddi": "55",
		"codeCountry": "1.111",
		"codeRevenue": "1.222"
	} */