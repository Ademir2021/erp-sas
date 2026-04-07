import { TPagSeguroItems } from "./TPagSeguroCard"

export type TPagSeguroPix = {
    reference_id: string
    description: string
    customer: {
        name: string
        email: string
        tax_id: string
        phones: [
            {
                country: string
                area: string
                number: string
                type: string
            }
        ]
    },
    items: TPagSeguroItems[]
    qr_codes: [
        {
            amount: {
                value: number | string
            },
            expiration_date: string | Date
            links: [
                {
                    href: string
                }
            ]
        }
    ]
    shipping: {
        address: {
            street: string
            number: number,
            complement: string
            locality: string
            city: string
            region_code: string
            country: string
            postal_code: string
        }
    },
    notification_urls: [
        string]
}

export type TResponsePixQRCode = {
    id: string
    qr_codes: [{
        id: string
        text: string
        amount: {
            value: number
        }
    }
    ],
    error_messages:[{
        code: string
        description: string
        parameter_name: string
    }]
}