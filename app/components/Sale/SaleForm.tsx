'use client'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { TCreditCart, TItemsSale, TOperationSale, TSale } from "@/app/models/TSale"
import ITemsSaleForm from "./ItemsSaleForm"
import { TItem } from "@/app/models/TItem"
import { ItemsSaleList } from "./ItemsSaleList"
import { TPerson } from "@/app/models/TPerson"
import { useEffect, useState } from "react"
// import CreditCardForm from "./CreditCardForm"
import { TResponsePixQRCode } from '@/app/models/TPagSeguroPix';
import { globalStyles_form, globalStylesTitle, globalStylesToggle } from '../GlobalStyles';
import CashForm from './CashForm';
import PaypalCheckout from "../PaypalCheckout";
import { userAuth } from '@/app/lib/userAuth';

type Props = {
    children: TSale
    setSearchITemName: Function
    items: TItem[]
    setItems: Function
    itemsSale: TItemsSale[]
    setItemsSale: Function
    handleSubmit: any
    msg: string
    setChildren: Function
    persons: TPerson[]
    operationsSale: TOperationSale[]
    setOperationSale: Function
    operationSale: TOperationSale
    creditCard: TCreditCart
    setCreditCard: Function
    handleSubmitCreditCard: any
    person: TPerson
    setPerson: Function
    msgCreditCard: string
    responseIdSale: number
    handleSubmitPix: any
    qrcode: TResponsePixQRCode
    setInstallmentAccount: Function
    cash: number
    setCash: Function
    handleAmount: number
    handleItem: string
    searchItemName: string
    setPaymentPayPal: Function
    setOrderPayPal: Function
}

export default function SaleForm({
    children, setSearchITemName,
    items, setItems, itemsSale, setItemsSale,
    handleSubmit, msg, setChildren, persons,
    operationsSale, setOperationSale, operationSale,
    creditCard, setCreditCard, handleSubmitCreditCard, person,
    setPerson, msgCreditCard, responseIdSale, handleSubmitPix,
    qrcode, setInstallmentAccount, cash, setCash, handleAmount,
    handleItem, searchItemName, setPaymentPayPal, setOrderPayPal }: Props) {

    const { isUser, isAdmin } = userAuth()
    const [step, setStep] = useState(false)
    const totalSale = itemsSale.reduce(
        (total, i) => total + i.amount * i.price,
        0
    );

    useEffect(() => {
        setChildren((prev: TSale) => ({
            ...prev,
            tSale: totalSale - prev.discount
        }));
    }, [totalSale]);

    useEffect(() => {
        setCreditCard((prev: TCreditCart) => ({
            ...prev,
            payment: totalSale - cash
        }));
    }, [totalSale, cash]);

    const cashForm = <CashForm cash={cash} setCash={setCash} sale={children} setSale={setChildren} />

    function valPixCash() {
        const amountOwed = totalSale - cash - children.discount
        if (amountOwed > 0)
            return `Pagar com PIX: R$${Number(amountOwed).toFixed(2)}`
        if (amountOwed < 0)
            return `Desconto concedido: R$ ${Math.abs(amountOwed).toFixed(2)}`
    }

    function finalizeOrder(title: string) {
        return <a className="px-2 py-2 bg-green-600 text-white rounded-lg cursor-pointer"
            onClick={handleSubmit}
        >{title}</a>
    }

    const addItemInput = async () => {
        if (items?.length === 0) return;
        setItemsSale((prev: TItemsSale[]) => {
            const item = items[0];
            const amountToAdd = handleAmount || 1;
            const existingItemIndex = prev.findIndex(
                (i) => i.item.id === item.id);
            if (existingItemIndex !== -1) {
                return prev.map((i, index) => {
                    if (index !== existingItemIndex) return i;
                    const newAmount = i.amount + amountToAdd;
                    return {
                        ...i,
                        amount: newAmount,
                        tItem: newAmount * i.price
                    };
                });
            };
            const newItem: TItemsSale = {
                item,
                amount: amountToAdd,
                price: item.priceMax,
                tItem: amountToAdd * item.priceMax
            };
            return [...prev, newItem];
        });
        setSearchITemName("");
    }

    function creditInstallment(i: number) {
        const val = Number(totalSale - children.discount - cash)
        if (val > 99) {
            if (i == 1)
                return ` ${i} x | Pagamento único
            R$${(val).toFixed(2)} BRL`
            if (i > 1)
                return `${val.toFixed(2)} Parcelado em ${i}
            x de R$${(val / i).toFixed(2)} BRL`
        }
    }

    useEffect(() => {
        if (operationSale.id !== 5) {
            setItems([])
        }
    }, [operationSale.id])

    return <>
        <div id="up-sale" className={`${globalStyles_form}`}>

            <div className="flex items-center gap-4 bg-zinc-900 p-4 rounded-xl shadow-lg">
                <div className="flex items-center justify-center w-14 h-14 bg-blue-500/20 rounded-full">
                    <ChecklistRtlIcon
                        sx={{ fontSize: 32 }}
                        titleAccess="Checkout"
                        className="text-blue-400"
                    />
                </div>

                <div className="flex flex-col">
                    <span className="text-sm text-zinc-400 uppercase tracking-wider">
                        Total da Venda
                    </span>

                    <span className="text-3xl font-extrabold text-green-400">
                        {totalSale.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </span>
                </div>
            </div>

            {operationSale.id === 5 && <ItemsSaleList
                itemsSale={itemsSale}
                setItemsSale={setItemsSale}
            />}
            {operationSale.id == 5 && <><label className={`${globalStylesTitle} text-white`}>Buscar</label>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    if (!searchItemName?.trim()) return;
                    setTimeout(async () => {
                        await addItemInput();
                    }, 16);
                }} >
                    <input
                        className="mb-3 w-full p-3 border rounded-lg"
                        value={searchItemName || ""}
                        type="search"
                        placeholder="Item ..."
                        autoFocus
                        onChange={(e) => setSearchITemName(e.target.value)}
                    />
                </form></>}

            {/**Step Toggle */}
            <button className={`${globalStylesToggle} cursor-pointer`} onClick={() => setStep(!step)}>
                {step ? <ExpandLessIcon fontSize="large" /> : <ArrowForwardIosIcon fontSize='small' />}
                {step ? " Ocultar Operações" : " Ir para Operações"}
            </button>
            {step === true && <> <div className="mb-2">
                <>
                    {/**Operações de Venda */}
                    <label className={`${globalStylesTitle}`}>Operações de Vendas</label>
                    <select
                        className="w-full p-2 border bg-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={children.operationSale?.id || ''}
                        onChange={(e) => {
                            const selectedId = Number(e.target.value);
                            children.operationSale.id = selectedId // para o id da operação para venda
                            const selectedOperation = operationsSale.find(
                                (op) => op.id === selectedId
                            );
                            setOperationSale(selectedOperation);
                        }}
                    >
                        <option disabled value="">
                            Selecione uma Operação de Venda ...
                        </option>
                        {isAdmin ? operationsSale.map((operationSale) => (
                            <option
                                key={operationSale.id}
                                value={operationSale.id}
                            >
                                {operationSale.description}
                            </option>
                        )) : isUser && (
                            <> <option value={2}
                            >💳 Pagar Cartão Débito ou Crédito</option>
                                <option className='bg-gray-50' value={5}
                                >🛒 Comprar +</option></>
                        )}
                    </select>

                    <label className={`${globalStylesTitle}`}>Selecionar o Comprador</label>
                    <select
                        className="w-full p-2 border bg-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={children.person.id || ''}
                        name="id"
                        onChange={(e) => {
                            const selected = persons.find(p => p.id === Number(e.target.value))
                            setChildren((prev: TSale) => ({
                                ...prev,
                                person: selected as TPerson
                            }));
                            setPerson(selected as TPerson);
                        }
                        }>
                        <option disabled value="">
                            Selecione o Comprador ...
                        </option>
                        {persons.map((person) => (
                            <option key={person.id}
                                value={person.id}>{person.name}</option>
                        ))}
                    </select>

                    {/**Dados do cartão */}
                    {/* {operationSale.id === 2 && itemsSale.length > 0 && person &&
                        <> {cashForm}
                            <CreditCardForm
                                creditCard={creditCard}
                                setCreditCard={setCreditCard}
                                handleSubmitCreditCard={handleSubmitCreditCard}
                                msgCreditCard={msgCreditCard}
                            /></>} */}

                    {/**PayPal */}
                    {operationSale.id === 2 && itemsSale.length > 0 && person &&
                        <> {isAdmin && cashForm}
                            <main className="mt-3">
                                <PaypalCheckout
                                    amount={Number(totalSale - cash - children.discount).toFixed(2)}
                                    onSuccess={(details) => {
                                        setPaymentPayPal(details);
                                    }}
                                    orderSuccess={(details) => {
                                        setOrderPayPal(details)
                                    }}
                                />
                            </main>
                        </>
                    }

                    {/**Venda a prazo */}
                    {operationSale.id === 3 && person && itemsSale.length > 0 &&
                        <><label className={`${globalStylesTitle}`}>Seleciona a Quantidade de Parcelas</label>
                            <select
                                className="w-full p-3 border bg-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setInstallmentAccount(Number(e.target.value))}
                                defaultValue=""
                            >
                                <option disabled value="">
                                    Parcela em até 6 vezes a partir de R$100.00 ...
                                </option>
                                <option value="1">{creditInstallment(1)}</option>
                                <option value="2">{creditInstallment(2)}</option>
                                <option value="3">{creditInstallment(3)}</option>
                                <option value="4">{creditInstallment(4)}</option>
                                <option value="5">{creditInstallment(5)}</option>
                                <option value="6">{creditInstallment(6)}</option>
                            </select>
                            {children.accountsReceivable?.length as any > 0 ? <>
                                {cashForm}
                                <div className="flex justify-center gap-2.5 mt-4">
                                    <a className="px-2 py-2 bg-green-600 text-white rounded-lg cursor-pointer"
                                        onClick={handleSubmit}
                                    >Finalizar Compra a Prazo</a>
                                    <a />
                                </div>
                            </> : <p className='text-center p-2 text-red-400'>Informe a Quantidade de Parcelas</p>}
                        </>}
                </>
            </div>

                {/**Venda a Vista */}
                {operationSale.id === 1 && itemsSale.length > 0 && person && <>
                    {cashForm}
                    <p className='flex justify-center p-1 text-green-500 '>
                        {valPixCash()}</p>
                    <div className="flex justify-center gap-2.5 mt-4">
                        <a className="px-2 py-2 bg-green-600 text-white rounded-lg cursor-pointer"
                            onClick={handleSubmitPix}
                        >Gerar PIX</a>
                        {finalizeOrder("Finalizar Compra")}
                        <a />
                    </div></>} </>}

            {/**Orçamentos */}
            {operationSale.id === 4 && itemsSale.length > 0 && person &&
                <p className='flex justify-center p-1 text-green-500 '>
                    {finalizeOrder("Gerar Orçamento")}
                </p>
            }

            {/**Mensagens*/}
            {msg && <p className=" flex justify-center mt-3 text-green-300 ">{msg}</p>}
            {responseIdSale > 0 && <a
                href={`${process.env.NEXT_PUBLIC_API_CUPOM}/${responseIdSale}/pdf`}
                className="flex justify-center text-green-500"
                target="_blank"
                rel="noopener noreferrer">Imprimir Venda</a>}

            {/**Gerar PIX */}
            <div className="flex justify-center mt-6 mb-4">
                {qrcode.qr_codes[0].text && (
                    <div className="bg-gray-800 p-4 rounded-2xl shadow-lg w-full max-w-md text-center">
                        {/* Título */}
                        <h2 className="text-white text-lg font-semibold mb-3">
                            Pagamento via PIX
                        </h2>
                        {/* QR Code */}
                        <div className="flex justify-center mb-4">
                            <img
                                className="rounded-lg border border-gray-600"
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrcode.qr_codes[0].text)}`}
                                alt="QR Code PIX"
                            />
                        </div>
                        {/* Código copia e cola */}
                        <div className="bg-gray-900 p-2 rounded-lg text-xs text-gray-300 break-all mb-3 max-h-24 overflow-y-auto">
                            {qrcode.qr_codes[0].text}
                        </div>
                        {/* Botão copiar */}
                        <button
                            onClick={() => navigator.clipboard.writeText(qrcode.qr_codes[0].text)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                        >Copiar código PIX
                        </button>
                    </div>)}
            </div>
            {/**PIX */}
            {qrcode.qr_codes[0].amount.value > 0 && (
                <div className="flex justify-center text-blue-100 mt-2">
                    Valor do PIX: R$ ${(qrcode.qr_codes[0].amount.value / 100).toFixed(2)}
                </div>
            )}
            <ITemsSaleForm
                items={items}
                setItemsSale={setItemsSale}
                msg={msg}
                handleAmount={handleAmount}
            />
            <div className="bg-zinc-900 text-gray-200 rounded-xl p-5 shadow-lg border border-zinc-700 max-w-3xl">
                <h2 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                    📋 Help do Checkout
                </h2>

                <div className="space-y-3 text-sm md:text-base">
                    <div className="flex items-start gap-2">
                        <span className="text-yellow-400 font-bold">⌨️ F5</span>
                        <span>Limpar tela.</span>
                    </div>

                    <div className="flex items-start gap-2">
                        <span>📦</span>
                        <span>
                            No campo <strong>Itens</strong>, informe a descrição,
                            código ou código de barras do produto.
                        </span>
                    </div>

                    <div className="flex items-start gap-2">
                        <span>🔢</span>
                        <span>
                            Para vender múltiplas unidades, utilize o formato:
                            <strong className="text-green-400"> Quantidade * Item</strong>
                            <span className="ml-1">(Ex.: 3*Arroz)</span>
                        </span>
                    </div>

                    <div className="flex items-start gap-2">
                        <span>💰</span>
                        <span>
                            Utilize a operação
                            <strong className="text-blue-400"> Vender + </strong>
                            e selecione a forma de pagamento para finalizar a venda.
                        </span>
                    </div>

                    <div className="flex items-start gap-2">
                        <span>🛠️</span>
                        <span>
                            Em caso de dúvidas, entre em contato com o suporte técnico.
                        </span>
                    </div>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-700">
                    <span className="text-gray-400">Operador:</span>
                    <span className="ml-2 font-semibold text-yellow-400">
                        {person?.name || "Não definido"}
                    </span>
                </div>
            </div>
        </div>
    </>
}