import { TPagSeguroItems } from "./TPagSeguroCard"

export type TPagSeguroPix = {
  reference_id: string;
  description: string;
  customer: TCustomer;
  items: TPagSeguroItems[];
  qr_codes: TQrCode[];
  shipping: TShipping;
  notification_urls: string[];
};

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

type TCustomer = {
  name: string;
  email: string;
  tax_id: string;
  phones: TPhone[];
};

type TPhone = {
  country: string;
  area: string;
  number: string;
  type: "MOBILE" | "HOME" | "WORK"; // pode ajustar se houver mais tipos
};

type TQrCode = {
  amount: {
    value: number;
  };
  expiration_date: string; // pode virar Date se você transformar depois
  links: TLink[];
};

type TLink = {
  href: string;
};

type TShipping = {
  address: TAddress;
};

type TAddress = {
  street: string;
  number: string;
  complement?: string;
  locality: string;
  city: string;
  region_code: string;
  country: string;
  postal_code: string;
};