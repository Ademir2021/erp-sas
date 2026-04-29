'use client'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { TCreditCart, TItemsSale, TOperationSale, TSale } from "@/app/models/TSale"
import ITemsSaleForm from "./ItemsSaleForm"
import { TItem } from "@/app/models/TItem"
import { ItemsSaleList } from "./ItemsSaleList"
import { TPerson } from "@/app/models/TPerson"
import { useEffect, useState } from "react"
import CreditCardForm from "./CreditCardForm"
import { TResponsePixQRCode } from '@/app/models/TPagSeguroPix';
import { globalStyles_form, globalStylesTitle, globalStylesToggle } from '../GlobalStyles';
import CashForm from './CashForm';

type Props = {
    children: TSale
    setSearchITemName: Function
    items: TItem[]
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
}

export default function SaleForm({
    children, setSearchITemName,
    items, itemsSale, setItemsSale,
    handleSubmit, msg, setChildren, persons,
    operationsSale, setOperationSale, operationSale,
    creditCard, setCreditCard, handleSubmitCreditCard, person,
    setPerson, msgCreditCard, responseIdSale, handleSubmitPix,
    qrcode, setInstallmentAccount, cash, setCash, handleAmount,
    handleItem, searchItemName }: Props) {

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

    const vallorCash = cash - totalSale

    function finalizeOrder(title: string) {
        return <a className="px-2 py-2 bg-green-600 text-white rounded-lg cursor-pointer"
            onClick={handleSubmit}
        >{title}</a>
    }

    function addItemInput() {
        if (!handleItem || !handleAmount || !items?.length) return;
        setItemsSale((prev: TItemsSale[]) => {
            const existingItemIndex = prev.findIndex(
                (i) => i.item.id === items[0].id) // Ajuste conforme a chave única do item

            if (existingItemIndex !== -1) { // Item já existe → incrementa quantidade
                return prev.map((i, index) =>
                    index === existingItemIndex
                        ? { ...i, amount: i.amount + handleAmount || 1, tItem: i.amount * i.price } : i)
            }
            const newItem: TItemsSale = {  // Item não existe → adiciona novo
                item: items[0],
                amount: handleAmount || 1,
                price: items[0].priceMax
            }
            return [...prev, newItem]
        })
        setSearchITemName('!')
    }

    return <>
        <div id="up-sale" className={`${globalStyles_form}`}>
            <div>
                <h1 className={`${globalStylesTitle} justify-center`}>Orçamentos - Pedidos e Vendas</h1>
                {<p className="flex justify-center font-sans text-green-100 bg-gray-800 mb-2 p-2 text-center rounded-b-none shadow-md">
                    Total da Compra {totalSale !== 0 ? `R$ ${totalSale.toFixed(2)}` : "R$ 0,00"}</p>}
            </div>
            <ItemsSaleList
                itemsSale={itemsSale}
                setItemsSale={setItemsSale}
            />
            <div>
                <label className={`${globalStylesTitle}`}>Pesquisar Items ...</label>
                <input
                    className="mb-3 w-full p-3 border rounded-lg"
                    value={searchItemName !== "!" ? searchItemName : ""}
                    type='search'
                    placeholder="Item ... || Quant*Item ..."
                    onChange={(e) => setSearchITemName(e.target.value.toString())}
                    onKeyDown={(e) => { if (e.key === 'Enter') { addItemInput(); } }} autoFocus
                />
            </div>
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
                        className="w-full p-3 border bg-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                        {operationsSale.map((operationSale) => (
                            <option
                                key={operationSale.id}
                                value={operationSale.id}
                            >
                                {operationSale.description}
                            </option>
                        ))}
                    </select>
                    <label className={`${globalStylesTitle}`}>Selecionar o Comprador</label>
                    <select
                        className="w-full p-3 border bg-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={children.person.id || ''}
                        name="id"
                        onChange={(e) => {
                            const selectedId = Number(e.target.value);
                            children.person.id = selectedId // para o id da Pessoa da venda
                            const selectedOperation = persons.find(
                                (per) => per.id === selectedId
                            );
                            setPerson(selectedOperation);
                        }}>
                        <option disabled value="">
                            Selecione o Comprador ...
                        </option>
                        {persons.map((person) => (
                            <option key={person.id}
                                value={person.id}>{person.name}</option>
                        ))}
                    </select>

                    {/**Dados do cartão */}
                    {operationSale.id === 2 && itemsSale.length > 0 && person &&
                        <> {cashForm}
                            <CreditCardForm
                                creditCard={creditCard}
                                setCreditCard={setCreditCard}
                                handleSubmitCreditCard={handleSubmitCreditCard}
                                msgCreditCard={msgCreditCard}
                            /></>}

                    {/**Venda a prazo */}
                    {operationSale.id === 3 && person && itemsSale.length > 0 &&
                        <><label className={`${globalStylesTitle}`}>Seleciona a Quantidade de Parcelas</label>
                            <select
                                className="w-full p-3 border bg-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setInstallmentAccount(Number(e.target.value))}
                                defaultValue=""
                            >
                                <option disabled value="">
                                    Parcelamento até em 6 vezes ...
                                </option>
                                <option value="1">1x - Sem Juros</option>
                                <option value="2">2x - Juros de 5%</option>
                                <option value="3">3x - Juros de 10%</option>
                                <option value="4">4x - Juros de 15%</option>
                                <option value="5">5x - Juros de 20%</option>
                                <option value="6">6x - Juros de 25%</option>
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
                        {vallorCash < 0 ? "Receber no PIX : " : "Troco : "} {cash > 0 ? Number(vallorCash).toFixed(2) : '0.00'}</p>
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
                href={`${process.env.NEXT_PUBLIC_API_NOTA}/${responseIdSale}/pdf`}
                className="flex justify-center text-green-500"
                target="_blank"
                rel="noopener noreferrer">Imprimir Venda</a>}
            <div className="flex justify-center mt-6 mb-4">
                {qrcode.qr_codes[0].text ? (
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
                    </div>) : (
                    itemsSale.length > 0 &&
                    person &&
                    operationSale.id === 1 && (
                        <p className="text-red-500 text-center">
                            Gere o PIX para visualizar o QR Code</p>))}
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
        </div>
    </>
}