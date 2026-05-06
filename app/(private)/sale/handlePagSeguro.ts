import { TPagSeguroCard, TPagSeguroItems } from "@/app/models/TPagSeguroCard";
import { TPagSeguroPix } from "@/app/models/TPagSeguroPix";
import { TPerson } from "@/app/models/TPerson";
import { TCreditCart, TItemsSale, TOperationSale, TSale } from "@/app/models/TSale";
import { v4 as uuidv4 } from 'uuid';

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

type PropsCard = {
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
}: PropsCard): TPagSeguroCard => {
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

type PropsPIX = {
    p: TPagSeguroPix;
    sale: TSale;
    operationSale: TOperationSale;
    person: TPerson;
    itemsSale: TItemsSale[];
}

export const mapFieldsPagSeguroPix = ({
    p,
    sale,
    operationSale,
    person,
    itemsSale,
}: PropsPIX): TPagSeguroPix => {
    const newP = {
        ...p,
        reference_id: uuidv4(),
        description: operationSale.description,
        customer: mapCustomer(person, sale),
        shipping: mapShipping(person)
    }
    arrayItems(newP as TPagSeguroPix as any, itemsSale)
    return newP as TPagSeguroPix
}



