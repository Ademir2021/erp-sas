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
import pagSeguroPixJSON from "./JSON/pagSeguroPix.json"
import { TPagSeguroCard, TPagSeguroItems, TPagSeguroResponse, TPublicKey } from "@/app/models/TPagSeguroCard"
import { TResponsePixQRCode, TPagSeguroPix } from "@/app/models/TPAgSeguroPix"

// Adiciona a definição de PagSeguro ao tipo Window
declare global {
    interface Window {
        PagSeguro?: any;
    }
}

export default function Sales() {

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

    const pagSeguroPix_: any = pagSeguroPixJSON
    const [pagSeguroPix] = useState<TPagSeguroPix>(pagSeguroPix_);
    const [qrcodePagSeguro, setQrcode] = useState<TResponsePixQRCode>({
        qr_codes: [{ text: "", amount: { value: 0 } }],
        error_messages: [{ code: "", description: "", parameter_name: "" }]
    });

    const [operationsSale, setOperationsSale] = useState<TOperationSale[]>([])
    const [persons, setPersons] = useState<TPerson[]>([])
    const [responseIdSale, setResponseIdSale] = useState(0)
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
            role: "USER" as UserRole,
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
        script.src = process.env.NEXT_PUBLIC_SDK_PAGSEGURO as string;
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
                    role: "USER" as UserRole,
                    token: user.token
                }
                setSale({ ...sale, user: userSale })
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

    /**PagSeguro Card */
    const mapFieldsPagSeguroCard = (p: TPagSeguroCard) => {
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
        mapFieldsPagSeguroArrayItens(pagSeguroCard, itemsSale)
        setPagSeguroCard(pagSeguroCard)
    };

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

    function mapFieldsPagSeguroArrayItens(p: TPagSeguroCard, saleItens: TItemsSale[]) {
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

    async function registerPagSeguroCard() {

        try {
            const response = await fetch("/api/paymentcard", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pagSeguroCard),
            });
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            const data: TPagSeguroResponse = await response.json();
            const charge = data?.charges?.[0];
            if (!charge) {
                throw new Error("Resposta inválida do PagSeguro");
            }
            switch (charge.status) {
                case "PAID":
                    const resp: TResponseMessage = charge as any;
                    setMsgCreditCard(`Pagamento aprovado! ID: ${resp.data.id || 'N/A'}`);
                    handleSaveSale();
                    break;
                case "DECLINED":
                    setMsgCreditCard("Pagamento recusado. Verifique os dados do cartão.");
                    break;
                case "CANCELED":
                    setMsgCreditCard("Pagamento cancelado.");
                    break;
                case "AUTHORIZED":
                    setMsgCreditCard("Pagamento autorizado, aguardando captura.");
                    break;
                default:
                    setMsgCreditCard("Status desconhecido do pagamento.");
                    console.warn("Status inesperado:", charge.status, data);
            }
        } catch (error: any) {
            console.error("Erro geral:", error);
            setMsgCreditCard(
                "Erro ao processar pagamento. Tente novamente mais tarde."
            );
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
                mapFieldsPagSeguroCard(pagSeguroCard)
                registerPagSeguroCard()
            }
            if (encrypted.hasErrors === true) {
                setMsgCreditCard(JSON.stringify(encrypted.errors[0].code))
            }
        } catch (err: unknown) {
            setMsgCreditCard('ErroEncryptCard: ' + err)
        }
    };
    /**Fim PagSeguro Card */
    /**PagSeguro PIX */
    const mapFieldsPagSeguroPix = (p: TPagSeguroPix | any) => {
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
        mapFieldsPagSeguroArrayItens(pagSeguroPix as any, itemsSale);
    };

    const createPagSeguroPix = () => {
        let time = new Date();
        let expiration_date_qrcode = new Date();
        expiration_date_qrcode.setHours(time.getHours() + 48);
        mapFieldsPagSeguroPix(pagSeguroPix)
        const tSale = Math.round(Number(sale.tSale) * 100);
        pagSeguroPix.qr_codes[0].amount.value = tSale;
        pagSeguroPix.qr_codes[0].expiration_date = expiration_date_qrcode
        pagSeguroPix.notification_urls = ["https://meusite.com/notificacoes"]
    };

    async function registerPagSeguroPIX() {
        try {
            const response = await fetch("/api/paymentpix", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pagSeguroPix),
            });
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            const data: TResponsePixQRCode = await response.json()
            if (!data.qr_codes) {
                setMsg(`Erro ao gerar QRCode: ${data.error_messages?.[0]?.description || 'Erro desconhecido'}`)
            } else {
                setQrcode(data)
            }
        }
        catch (error: any) {
            console.error("Erro geral:", error);
        }
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
        const idSale = resp.data.id as number
        setResponseIdSale(idSale)
        router.refresh()
    }

    function handleSaveSale() {
        if (responseIdSale === 0) {
            loadItemsSale(sale)
            saveSale(sale)
        } else {
            setMsg("Esta venda já foi gravada")
        };
    }

    function hanldeSubmit(e: Event) {
        e.preventDefault()
        handleSaveSale()
    }

    function handleSubmitCreditCard(e: Event) {
        e.preventDefault()
        sdkPagSeguro()
    }

    function handleSubmitPix(e: Event) {
        e.preventDefault()
        loadItemsSale(sale)
        createPagSeguroPix()
        registerPagSeguroPIX()
    }

    return <>
        {/* <p>{JSON.stringify(sale.tSale)}</p> */}
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
            responseIdSale={responseIdSale}
            handleSubmitPix={handleSubmitPix}
            qrcode={qrcodePagSeguro || null}
        >
            {sale}
        </SaleForm>
    </>
}