'use client'

import { useEffect, useState } from "react"
import { TCreditCart, TItemsSale, TOperationSale, TSale } from "@/app/models/TSale"
import { TUser, UserRole } from "@/app/models/TUser"
import { useRouter } from 'next/navigation'
import SaleForm from "@/app/components/Sale/SaleForm"
import { TItem } from "@/app/models/TITem"
import { getUser } from "@/app/lib/auth"
import { TResponseMessage } from "@/app/models/TMessage"
import { TPerson } from "@/app/models/TPerson"
import { loadHandle } from "@/app/lib/handleApi"
import pagSeguroCardJSON from "./JSON/pagSeguroCard.json"
import { TPagSeguroCard, TPagSeguroItems, TPagSeguroResponse, TPublicKey } from "@/app/models/TPagSeguroCard"

// Adiciona a definição de PagSeguro ao tipo Window
declare global {
    interface Window {
        PagSeguro?: any;
    }
}

export default function Sales() {

    // res.charges[0].amount.summary.paid

    const router = useRouter()

    const pagSeguroCard_: any = pagSeguroCardJSON
    const [pagSeguroCard, setPagSeguroCard] = useState<TPagSeguroCard>(pagSeguroCard_);

    const [publicKey, setPublicKey] = useState<TPublicKey>({
        public_key: '', created_at: ''
    })
    const [creditCard, setCreditCard] = useState<TCreditCart>({
        public_key: "", holder: "", number: "",
        ex_month: "", ex_year: "", secure_code: "", encrypted: "",
        installments: 1, payment: 0
    });
    const [operationsSale, setOperationsSale] = useState<TOperationSale[]>([])
    const [persons, setPersons] = useState<TPerson[]>([])
    const [statusSaveSale, setStatusSaveSale] = useState(false)
    const [msg, setMsg] = useState('')
    const [msgCreditCard, setMsgCreditCard] = useState('')
    const [searchItemName, setSearchITemName] = useState('!')
    const [user, setUser] = useState<TUser>()
    const [items, setItems] = useState<TItem[]>([])
    const [itemsSale, setItemsSale] = useState<TItemsSale[]>([])
    const [sale, setSale] = useState<TSale>({
        branch: { id: 1, name: '' },
        user: {
            id: 0,
            login: '',
            password: '',
            role: UserRole.ADMIN,
            token: ''
        },
        person: { id: 0 },
        discount: 0,
        itemsSale: [],
        operationSale: {
            id: 0, description: '', type: "", controlsStock: false,
            generateFinancial: false, allowDiscount: false, updateCost: false,
            requiresInvoice: false, isReturn: false, cfop: '', defaultNature: '',
            active: true
        }
    })
    const [operationSale, setOperationSale] = useState<TOperationSale>(sale.operationSale)
    const [person, setPerson] = useState<TPerson | null>()

    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    useEffect(() => {
        async function loadUser() {
            const user = await getUser()
            setUser(user)
            if (user) {
                const userSale: TUser = {
                    id: user.id,
                    login: user.login,
                    role: user.role,
                    token: user.token
                }
                sale.user = userSale
            }
        }
        loadUser()
    }, [])

    useEffect(() => {
        const token = user?.token as string
        loadHandle(token, setPersons, 'person')
        loadHandle(token, setOperationsSale, 'operationsale')
        loadHandle(token, setPublicKey, 'pagseguropublickey')
    }, [user]);

    useEffect(() => {

        async function searchItemsByName() {

            const token = user?.token
            const params = new URLSearchParams({
                name: searchItemName,
            })
            try {
                if (!token) return
                const response = await fetch(`/api/itemsale?${params.toString()}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (!response.ok) {
                    throw new Error(`Erro: ${response.status}`)
                }
                const data: TItem[] = await response.json()
                setItems(data)
            } catch (error) {
                console.error("Erro na requisição:", error)
            }
        }
        setItems([])
        searchItemsByName()
    }, [user, searchItemName])

    function loadItemsSale(sale: TSale | any) {
        if (itemsSale.length > 0) {
            sale.itemsSale = itemsSale.map(i => ({
                item: { id: i.item.id },
                amount: i.amount,
                price: i.price,
                tItem: i.amount * i.price
            }))
        };
    }

    async function saveSale(sale: TSale) {

        const res = await fetch('/api/sale', {
            method: 'POST',
            body: JSON.stringify(sale),
        })

        const resp: TResponseMessage = await res.json()

        if (!res.ok) {
            setMsg(`Erro ao registrar Venda: ${JSON.stringify(resp)}`)
            return
        }

        router.push('/sales')
        setMsg(`Mensagems: ${resp.data.message}, ID Venda:${resp.data.id}, Venda OK:${resp.success}`)
        router.refresh()
    }

    function hanldeSubmit(e: Event) {
        e.preventDefault()
        if (statusSaveSale === false) {
            loadItemsSale(sale)
            saveSale(sale)
            setStatusSaveSale(true)
        } else {
            setMsg("Esta venda já foi gravada")
        }
    }

    const mapFieldsPagSeguro = (p: TPagSeguroCard) => {
        p.reference_id = sale.user.id?.toString() as any
        p.description = operationSale.description
        p.customer.name = person?.name.toString() as any
        p.customer.email = sale.user.login
        p.customer.tax_id = persons[0].cpf
        p.customer.phones[0].number = person?.phone.substring(2) as any
        p.customer.phones[0].country = person?.address.zipCode?.city?.country.ddi as any
        p.customer.phones[0].area = person?.phone.slice(0, -9) as any
        p.customer.phones[0].type = "MOBILE"
        p.shipping.address.street = person?.address.street as any
        p.shipping.address.number = parseInt(person?.address.number as any)
        p.shipping.address.complement = person?.address.complement.toString() as any
        p.shipping.address.locality = person?.address.neighborhood as any
        p.shipping.address.city = person?.address.zipCode?.city?.name as any
        p.shipping.address.region_code = person?.address.zipCode?.city?.state.acronym as any
        p.shipping.address.country = person?.address.zipCode?.city?.country.acronym as any
        p.shipping.address.postal_code = person?.address.zipCode?.code.replace(/[..-]/g, '') as any
        p.charges[0].reference_id = sale.user.id?.toString() as any
        p.charges[0].description = operationSale.description
        p.charges[0].payment_method.installments = creditCard.installments
        p.charges[0].payment_method.holder.tax_id = person?.cpf || person?.cnpj as any
        const valorReais = creditCard?.payment; // transforma string em número
        const valorCentavos = Math.round(valorReais * 100); // transforma em centavos e arredonda
        p.charges[0].amount.value = valorCentavos
        pagSeguroItens(pagSeguroCard, itemsSale)
        setPagSeguroCard(pagSeguroCard)
    };

    function pagSeguroItens(p: TPagSeguroCard, saleItens: TItemsSale[]) {
        p.items = []
        for (let i of saleItens) {
            const newItem: TPagSeguroItems = {
                reference_id: i.item.id.toString(),
                name: i.item.name.toString(),
                quantity: i.amount,
                unit_amount: i.item.priceMax.toString().replace(/[.]/g, '')
            }
            p.items.push(newItem)
        }
    };

    async function registerPagSeguroCard() {
        const response = await fetch("/api/paymentcard", {
            method: "POST",
            body: JSON.stringify(pagSeguroCard),
        });
        const data: TPagSeguroResponse = await response.json();

        if (!data.charges || data.charges.length === 0) {
            console.error("Erro PagSeguro:", data);
            setMsgCreditCard(`Erro ao processar pagamento: ${JSON.stringify(data)}`);
            return;
        }

        if (data.charges[0].status === "PAID") {
            const resp: TResponseMessage = data.charges[0] as any
            setMsgCreditCard(`Mensagem: ${resp.data.message}, ID Pagamento:${resp.data.id}, Pagamento OK:${resp.success}`)
            console.log(data);
                saveSale(sale) // Salva a venda somente após confirmação do pagamento
        }

        if (data.charges[0].status === "DECLINED") {
            setMsgCreditCard(`Pagamento Recusado: ${data.charges[0].status}`)
        }
    }

    const sdkPagSeguro = async () => {
        if (!window.PagSeguro || !publicKey) {
            setMsgCreditCard("SDK não carregado corretamente.");
            return;
        }
        try {
            const encrypted = await window.PagSeguro.encryptCard({
                publicKey: publicKey.public_key,
                holder: creditCard.holder,
                number: creditCard.number,
                expMonth: creditCard.ex_month,
                expYear: creditCard.ex_year,
                securityCode: creditCard.secure_code,
            });

            if (encrypted) {
                pagSeguroCard.charges[0].payment_method.card.encrypted = encrypted.encryptedCard
                mapFieldsPagSeguro(pagSeguroCard)
                registerPagSeguroCard()
            }

            if (encrypted.hasErrors === true) {
                setMsgCreditCard(JSON.stringify(encrypted.errors[0].code))
            }
        } catch (err: unknown) {
            setMsgCreditCard('ErroEncryptCard: ' + err)
        }
    };

    function handleSubmitCreditCard(e: Event) {
        e.preventDefault()
        sdkPagSeguro()
    }

    return <>
        {/* <p>{JSON.stringify(creditCard.installments)}</p> */}
        <SaleForm
            setSearchITemName={setSearchITemName}
            items={items}
            itemsSale={itemsSale}
            setItemsSale={setItemsSale}
            handleSubmit={hanldeSubmit}
            msg={msg}
            setChildren={setSale}
            persons={persons}
            operationsSale={operationsSale}
            setOperationSale={setOperationSale}
            operationSale={operationSale}
            creditCard={creditCard}
            setCreditCard={setCreditCard}
            handleSubmitCreditCard={handleSubmitCreditCard}
            person={person as any}
            setPerson={setPerson}
            msgCreditCard={msgCreditCard}
        >
            {sale}
        </SaleForm>
    </>
}