export type TPagSeguroCard = {
    reference_id: string,
    description: string,
    customer: {
        name: string,
        email: string,
        tax_id: string,
        phones: [
            {
                country: string,
                area: string,
                number: string,
                type: string
            }
        ]
    },
    items:TPagSeguroItems [],
    shipping: {
        address: {
            street: string,
            number: string | number,
            complement: string | null,
            locality: string,
            city: string,
            region_code: string,
            country: string,
            postal_code: string
        }
    },
    notification_urls: [
        "https://meusite.com/notificacoes" | string
    ],
    charges: [
        {
            reference_id: string,
            description: string,
            amount: {
                value: 0 | number | string,
                currency: string
            },
            payment_method: {
                type: "CREDIT_CARD" | string,
                installments: 1 | number,
                capture: true,
                card: {
                    encrypted: string,
                    store: false
                },
                holder: {
                    name: string,
                    tax_id: string
                }
            }
        }
    ]
}

export type TPagSeguroItems = {
    reference_id: string,
    name: string,
    quantity: string | number,
    unit_amount: string | number
}

export type TPublicKey = {
    public_key: string
    created_at: string
}

