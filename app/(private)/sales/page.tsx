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
import { TPagSeguroCard, TPagSeguroResponseCard, TPublicKey } from "@/app/models/TPagSeguroCard"
import { TResponsePixQRCode, TPagSeguroPix } from "@/app/models/TPAgSeguroPix"
import { TAccountsReceivable } from "@/app/models/TAccountsReceivable"
import { setDays } from "@/app/lib/momentDays"
import { mapFieldsPagSeguroCard, mapFieldsPagSeguroPix } from "./handlePagSeguro"
import { se } from "date-fns/locale"


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
    const [responsePagSeguroCard, setResponsePagSeguroCard] = useState<TPagSeguroResponseCard>({
        id: "", charges: [{
            id: "", reference_id: "", status: 'PENDING',
            created_at: "", paid_at: "", description: ""
        }]
    });
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
        id: "",
        qr_codes: [{ id: "", text: "", amount: { value: 0 } }],
        error_messages: [{ code: "", description: "", parameter_name: "" }]
    });
    const [cash, setCash] = useState(0);
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
        tSale: 0,
        discount: 0,
        itemsSale: [],
        operationSale: {
            id: 0, description: '', type: "", controlsStock: false,
            generateFinancial: false, allowDiscount: false, updateCost: false,
            requiresInvoice: false, isReturn: false, cfop: '', defaultNature: '',
            active: true
        },
        accountsReceivable: []
    });
    const [operationSale, setOperationSale] = useState<TOperationSale>(sale.operationSale)
    const [person, setPerson] = useState<TPerson | null>()
    const [installmentAccount, setInstallmentAccount] = useState(0)
    const [, setSaleAccountsReceivables] = useState<TAccountsReceivable[]>([])

    useEffect(() => {
        if (!installmentAccount || installmentAccount <= 0) {
            setSaleAccountsReceivables([]);
            return;
        }

        function setObservationsAccounts() {
            if (qrcodePagSeguro?.qr_codes[0]?.amount?.value > 0) {
                return "PIX"
            };
            if (operationSale.id === 2) {
                return "CARTÃO DE CRÉDITO"
            };
            return "CREDIÁRIO LOJA"
        }

        function setIdTypeOperationAccounts() {
            if (qrcodePagSeguro?.id !== "") {
                return qrcodePagSeguro.id
            };
            if (responsePagSeguroCard?.id !== "") {
                return responsePagSeguroCard.id
            };
            return `ID:${operationSale.id.toString()} - ${operationSale.description}`
        }

        const newAccountsReceivable: TAccountsReceivable[] = Array.from(
            { length: installmentAccount },
            (_, i) => {
                const remaining = ((Number(sale.tSale) || 0) -
                    (Number(cash) || 0)).toFixed(2) as any;
                const installmentNumber = i + 1;
                const VALUE = Number((remaining / installmentAccount).toFixed(2));
                return {
                    id: 0,
                    createdAt: new Date(),
                    updatedAt: null,
                    branch: { id: 1 },
                    user: { id: user?.id },
                    payer: { id: person?.id || 0 },
                    sale: { id: 0 },
                    value: VALUE,
                    receivedValue: 0,
                    balance: VALUE,
                    dueDate: setDays(i) as any,
                    description: '',
                    situation: 'OPEN',
                    observations: setObservationsAccounts(),
                    lateFee: 0,
                    interest: 0,
                    discount: 0,
                    type: 'CASH',
                    idTypeOperation: setIdTypeOperationAccounts(),
                    descriptionTypeOperation: `Parcela ${installmentNumber} de ${installmentAccount}`,
                };
            }
        );

        setSaleAccountsReceivables(newAccountsReceivable);
        // Se quiser atualizar o objeto sale diretamente, faça isso com cuidado
        sale.accountsReceivable = newAccountsReceivable;
    }, [
        sale.tSale,
        installmentAccount,
        user?.id,
        person?.id,
        cash,
        sale.discount,
        qrcodePagSeguro,
        responsePagSeguroCard.id
    ]);

    useEffect(() => { // Se não for parcelado zera o array
        if (operationSale.id === 3) {
            setInstallmentAccount(1);
        } else {
            setSaleAccountsReceivables([]);
            setSale(prev => ({
                ...prev,
                accountsReceivable: []
            }));
        }
    }, [operationSale.id]);

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
            const data: TPagSeguroResponseCard = await response.json(); //mudar para TPagSeguroResponse se a resposta for consistente
            const charge = data?.charges?.[0];
            if (!charge) {
                throw new Error("Resposta inválida do PagSeguro");
            }
            switch (charge.status) {
                case "PAID":
                    setMsgCreditCard(`Pagamento aprovado! ID: ${charge.id ? charge.id : 'N/A'}`);
                    setInstallmentAccount(creditCard.installments);
                    setResponsePagSeguroCard(data);
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
                mapFieldsPagSeguroCard(pagSeguroCard as TPagSeguroCard,
                    sale as TSale,
                    operationSale as TOperationSale,
                    person as TPerson,
                    creditCard as TCreditCart,
                    itemsSale as TItemsSale[],
                    setPagSeguroCard);
                registerPagSeguroCard()
            }
            if (encrypted.hasErrors === true) {
                setMsgCreditCard(JSON.stringify(encrypted.errors[0].code))
            }
        } catch (err: unknown) {
            setMsgCreditCard('ErroEncryptCard: ' + err)
        }
    };

    const createPagSeguroPix = () => {
        let time = new Date();
        let expiration_date_qrcode = new Date();
        expiration_date_qrcode.setHours(time.getHours() + 48);
        mapFieldsPagSeguroPix(pagSeguroPix as TPagSeguroPix | any,
            person as TPerson,
            user as TUser,
            operationSale as TOperationSale,
            itemsSale as TItemsSale[]);
        const tSale = Math.round(Number(sale.tSale - cash) * 100);
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
                if (data.qr_codes[0].amount.value > 0) {
                    setInstallmentAccount(1) // Gera apenas 1 parcela do PIX
                }
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
        setMsg(`${resp.data.message} ID ${String(resp.data.id).padStart(6, '0')}`)
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
        {/* <p>{JSON.stringify(cash)}</p> */}
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
            setInstallmentAccount={setInstallmentAccount}
            cash={cash}
            setCash={setCash}>
            {sale}
        </SaleForm>
    </>
}