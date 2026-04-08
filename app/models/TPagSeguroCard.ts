export type TPagSeguroCard = {
  reference_id: string
  description: string

  customer: {
    name: string
    email: string
    tax_id: string
    phones: {
      country: string
      area: string
      number: string
      type: "MOBILE" | "HOME" | "WORK"
    }[]
  }

  items: TPagSeguroItems[]

  shipping: {
    address: {
      street: string
      number: string | number
      complement?: string | null
      locality: string
      city: string
      region_code: string
      country: string
      postal_code: string
    }
  }

  notification_urls: string[]

  charges: {
    reference_id: string
    description: string

    amount: {
      value: number // centavos
      currency: "BRL"
    }

    payment_method: {
      type: "CREDIT_CARD"
      installments: number
      capture: boolean

      card: {
        encrypted: string
        store: boolean
      }

      holder: {
        name: string
        tax_id: string
      }
    }
  }[]
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

export type TPagSeguroResponseCard = {
  id: string
  charges: [
    {
      id: string
      reference_id: string
      status: 'PAID' | 'PENDING' | 'REFUSED' | 'CANCELED' | 'AUTHORIZED' | 'AUTHORIZED' | 'DECLINED'
      created_at: string
      paid_at: string
      description: string
    }
  ]
}