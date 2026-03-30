import { TPagSeguroItems } from "./TPagSeguroCard"

export type TPagSeguroPix = {
    reference_id: string
    description:string
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
    items:TPagSeguroItems []
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

/**QR Code */

type PixArrangement = "PIX";

type LinkRel = "QRCODE.PNG" | "QRCODE.BASE64";
type HttpMethod = "GET";

interface PixQRCode {
  id: string;
  expiration_date: string;
  amount: {
    value: number;
  };
  text: string;
  arrangements: PixArrangement[];
  links: {
    rel: LinkRel;
    href: string;
    media: string;
    type: HttpMethod;
  }[];
}

export type PixQRCodeResponse = PixQRCode[];