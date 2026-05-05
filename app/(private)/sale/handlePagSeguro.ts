import { TPagSeguroCard, TPagSeguroItems } from "@/app/models/TPagSeguroCard";
import { TPagSeguroPix } from "@/app/models/TPagSeguroPix";
import { TPerson } from "@/app/models/TPerson";
import { TCreditCart, TItemsSale, TOperationSale, TSale } from "@/app/models/TSale";
import { TUser } from "@/app/models/TUser";
import { v4 as uuidv4 } from 'uuid';

export const mapFieldsPagSeguroPix = (p: TPagSeguroPix | any,
    person: TPerson, user: TUser, operationSale: TOperationSale, itemsSale: TItemsSale[]) => {
    const phone = person?.phone?.replace(/\D/g, '') || '';
    p.customer = p.customer || {};
    p.customer.phones = p.customer.phones || [{}];
    p.shipping = p.shipping || {};
    p.shipping.address = p.shipping.address || {};
    p.reference_id = user?.id;
    p.description = operationSale.description;
    p.customer.name = person?.name;
    p.customer.email = user?.login;
    p.customer.tax_id = person?.cpf;
    p.customer.phones[0].country = person?.address.zipCode?.city?.country.ddi;
    p.customer.phones[0].area = phone.substring(0, 2);
    p.customer.phones[0].number = phone.substring(2);
    p.customer.phones[0].type = "MOBILE";
    p.shipping.address.street = person?.address.street;
    p.shipping.address.number = person?.address.number || '0';
    p.shipping.address.complement = person?.address.complement;
    p.shipping.address.locality = person?.address.neighborhood;
    p.shipping.address.city = person?.address.zipCode?.city?.name;
    p.shipping.address.region_code = person?.address.zipCode?.city?.state?.acronym;
    p.shipping.address.country = person?.address.zipCode?.city?.country?.acronym;
    p.shipping.address.postal_code = person?.address.zipCode?.code?.replace(/\D/g, '');
    arrayItems(p, itemsSale);
}

export function arrayItems(p: TPagSeguroCard, saleItens: TItemsSale[]) {
    p.items = []
    for (let i of saleItens) {
        const newItem: TPagSeguroItems = {
            reference_id: i.item.id.toString(),
            name: i.item.name.toString(),
            quantity: i.amount,
            unit_amount: Math.round(Number(i.price) * 100)
        }
        p.items.push(newItem)
    }
};

const mapCustomer = (person: TPerson, sale: TSale) => ({
    name: person?.name ?? "",
    email: sale?.user?.login ?? "",
    tax_id: person?.cpf || person?.cnpj || "",
    phones: [{
        number: person?.phone?.substring(2) ?? "",
        country: person?.address?.zipCode?.city?.country?.ddi ?? "55",
        area: person?.phone?.slice(0, -9) ?? "",
        type: "MOBILE"
    }]
})

const mapShipping = (person: TPerson) => ({
    address: {
        street: person?.address?.street ?? "",
        number: person?.address?.number ?? "",
        complement: person?.address?.complement ?? "",
        locality: person?.address?.neighborhood ?? "",
        city: person?.address?.zipCode?.city?.name ?? "",
        region_code: person?.address?.zipCode?.city?.state?.acronym ?? "",
        country: person?.address?.zipCode?.city?.country?.acronym ?? "",
        postal_code: person?.address?.zipCode?.code?.replace(/[.-]/g, '') ?? ""
    }
})

const mapCharges = (
    creditCard: TCreditCart,
    person: TPerson,
    operationSale: TOperationSale,
    encrypted: string,
    baseCharge: any
) => {

    const valorCentavos = Math.round((creditCard?.payment ?? 0) * 100)

    return [{
        ...baseCharge,
        reference_id: uuidv4(),
        description: operationSale.description,
        amount: {
            currency: "BRL",
            value: valorCentavos
        },
        payment_method: {
            ...baseCharge.payment_method,
            installments: creditCard.installments,
            card: { encrypted },
            holder: {
                name: person?.name ?? "",
                tax_id: person?.cpf || person?.cnpj || ""
            }
        }
    }]
}

type Props = {
    p: TPagSeguroCard;
    sale: TSale;
    operationSale: TOperationSale;
    person: TPerson;
    creditCard: TCreditCart;
    itemsSale: TItemsSale[];
    encrypted: string;
}

export const mapFieldsPagSeguroCard = ({
    p,
    sale,
    operationSale,
    person,
    creditCard,
    itemsSale,
    encrypted
}: Props): TPagSeguroCard => {

    const newP = {
        ...p,
        reference_id: uuidv4(),
        description: operationSale.description,
        customer: mapCustomer(person, sale),
        shipping: mapShipping(person),
        charges: mapCharges(
            creditCard,
            person,
            operationSale,
            encrypted,
            p.charges[0]
        )
    }

    arrayItems(newP as TPagSeguroCard, itemsSale)

    return newP as TPagSeguroCard
}