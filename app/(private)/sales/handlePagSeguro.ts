import { TPagSeguroCard, TPagSeguroItems } from "@/app/models/TPagSeguroCard";
import { TPagSeguroPix } from "@/app/models/TPAgSeguroPix";
import { TPerson } from "@/app/models/TPerson";
import { TCreditCart, TItemsSale, TOperationSale, TSale } from "@/app/models/TSale";
import { TUser } from "@/app/models/TUser";

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
    mapFieldsPagSeguroArrayItens(p as any, itemsSale);
}

export const mapFieldsPagSeguroCard = (p: TPagSeguroCard,
    sale: TSale, operationSale: TOperationSale, person: TPerson,
    creditCard: TCreditCart, itemsSale: TItemsSale[], setPagSeguroCard: Function) => {
    p.reference_id = sale.user.id?.toString() as any
    p.description = operationSale.description.toString()
    p.customer.name = person?.name.toString() as any
    p.customer.email = sale.user.login.toString()
    p.customer.tax_id = person?.cpf.toString() as any
    p.customer.phones[0].number = person?.phone.substring(2) as any
    p.customer.phones[0].country = person?.address.zipCode?.city?.country.ddi.toString() as any
    p.customer.phones[0].area = person?.phone.slice(0, -9).toString() as any
    p.customer.phones[0].type = "MOBILE"
    p.shipping.address.street = person?.address.street.toString() as any
    p.shipping.address.number = person?.address.number.toString() as any
    p.shipping.address.complement = person?.address.complement.toString() as any
    p.shipping.address.locality = person?.address.neighborhood.toString() as any
    p.shipping.address.city = person?.address.zipCode?.city?.name.toString() as any
    p.shipping.address.region_code = person?.address.zipCode?.city?.state.acronym.toString() as any
    p.shipping.address.country = person?.address.zipCode?.city?.country.acronym.toString() as any
    p.shipping.address.postal_code = person?.address.zipCode?.code.replace(/[..-]/g, '') as any
    p.charges[0].reference_id = sale.user.id?.toString() as any
    p.charges[0].description = operationSale.description.toString() as any
    p.charges[0].payment_method.installments = creditCard.installments
    p.charges[0].payment_method.holder.tax_id = person?.cpf.toString() as any
    p.charges[0].payment_method.holder.name = person?.name.toString() as any
    const valorReais = creditCard?.payment; // transforma string em número
    const valorCentavos = Math.round(valorReais * 100); // transforma em centavos e arredonda
    p.charges[0].amount.value = valorCentavos
    mapFieldsPagSeguroArrayItens(p, itemsSale)
    setPagSeguroCard(p)
};

export function mapFieldsPagSeguroArrayItens(p: TPagSeguroCard, saleItens: TItemsSale[]) {
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