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

/** charges: [
    {
      id: 'CHAR_01CE36A0-6BE1-4BCF-93AB-4DC96ABF9570',
      reference_id: '4',
      status: 'PAID',
      created_at: '2026-03-29T14:21:29.533-03:00',
      paid_at: '2026-03-29T14:21:30.000-03:00',
      description: 'Venda com Cartão de Crédito',
      amount: [Object],
      payment_response: [Object],
      payment_method: [Object],
      metadata: [Object],
      links: [Array]
    }
  ],*/

  export type TPagSeguroResponse = {
  charges: TChargeResponse[];
  [key: string]: any; // caso o PagSeguro retorne outros campos
};

export type TChargeResponse = {
  id: string;
  reference_id: string;
  status: 'PENDING' | 'AUTHORIZED' | 'PAID' | 'FAILED' | 'CANCELED' |'DECLINED';
  created_at: string; // ISO 8601
  paid_at?: string;   // ISO 8601, pode ser undefined se não pago
  description: string;
  amount: {
    value: number;      // em centavos
    currency: string;   // ex: "BRL"
  };
  payment_response?: {
    code?: string;
    message?: string;
    [key: string]: any; // qualquer outro campo retornado
  };
  payment_method: {
    type: 'CREDIT_CARD' | 'BOLETO' | 'PIX' | string;
    installments?: number;
    capture?: boolean;
    card?: {
      holder: {
        name: string;
      };
      brand?: string;
      last_digits?: string;
      first_digits?: string;
      encrypted?: string;
    };
    [key: string]: any;
  };
  metadata?: Record<string, any>;
  links?: Array<{
    href: string;
    rel: string;
    media_type?: string;
  }>;
};

