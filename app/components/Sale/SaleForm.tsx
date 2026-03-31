'use client'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { TCreditCart, TItemsSale, TOperationSale, TSale } from "@/app/models/TSale"
import ITemsSaleForm from "./ItemsSaleForm"
import { TItem } from "@/app/models/TITem"
import { ItemsSaleList } from "./ItemsSaleList"
import { TPerson } from "@/app/models/TPerson"
import { useEffect, useState } from "react"
import CreditCardForm from "./CreditCardForm"
import { TResponsePixQRCode } from '@/app/models/TPAgSeguroPix';

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
}

export default function SaleForm({
    children, setSearchITemName,
    items, itemsSale, setItemsSale,
    handleSubmit, msg, setChildren, persons,
    operationsSale, setOperationSale, operationSale,
    creditCard, setCreditCard, handleSubmitCreditCard, person,
    setPerson, msgCreditCard, responseIdSale, handleSubmitPix, qrcode }: Props) {

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
            payment: totalSale
        }));
    }, [totalSale]);

    return <>
        <div id="up-sale" className="max-w-7xl mx-auto bg-gray-600 p-8 rounded-2xl shadow-lg">
            <div>
                <h1 className="flex justify-center font-bold text-1xl">Orçamentos - Pedidos e Vendas</h1>
                {<p className="flex justify-center font-sans text-green-100 bg-gray-800 mb-2 p-2 text-center rounded-b-none shadow-md">
                    Total da Compra {totalSale !== 0 ? `R$ ${totalSale.toFixed(2)}` : "R$ 0,00"}</p>}
            </div>
            <ItemsSaleList
                itemsSale={itemsSale}
                setItemsSale={setItemsSale}
            />
            <form>
                <label className="font-black p-2">Pesquisar Items ...</label>
                <input
                    className="mb-3 w-full p-3 border rounded-lg"
                    placeholder="Buscar Item ..."
                    onChange={(e) => setSearchITemName(e.target.value.toString())}
                />
            </form>
            {/**Step Toggle */}
            <button onClick={() => setStep(!step)}>
                {step ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                {step ? " Ocultar Operações" : " Ir para Operações"}
            </button>
            {step === true && <> <div className="mb-2">
                <>
                    {/**Operações de Venda */}
                    <label>Operações de vendas</label>
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
                    <label>Selecionar o nome do Comprador</label>
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
                        <CreditCardForm
                            creditCard={creditCard}
                            setCreditCard={setCreditCard}
                            handleSubmitCreditCard={handleSubmitCreditCard}
                            msgCreditCard={msgCreditCard}
                        />}
                </>
            </div>
                {/**Venda a Vista */}
                {operationSale.id === 1 && itemsSale.length > 0 && person &&
                    <div className="flex justify-center gap-2.5 mt-4">
                        <a className="px-2 py-2 bg-green-600 text-white rounded-lg cursor-pointer"
                            onClick={handleSubmitPix}
                        >Gerar PIX</a>
                        <a className="px-2 py-2 bg-green-600 text-white rounded-lg cursor-pointer"
                            onClick={handleSubmit}
                        >Finalizar Compra</a>
                        <a />
                    </div>} </>}
            {/**Mensagens*/}
            {msg && <p className=" flex justify-center mt-3 text-green-300 ">{msg}</p>}
            {responseIdSale > 0 && <a
                href={`${process.env.NEXT_PUBLIC_API_NOTA}/${responseIdSale}/pdf`}
                className="flex justify-center text-green-500"
                target="_blank"
                rel="noopener noreferrer">Imprimir Venda</a>}
            <div className='flex justify-center mt-4 mb-3'>
                {qrcode.qr_codes[0].text ? <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrcode.qr_codes[0].text)}`}
                    alt="QR Code PIX"
                /> : itemsSale.length > 0 && person && operationSale.id === 1 &&
                <p className="text-red-500">Gere o PIX para visualizar o QR Code</p>}
            </div>
            {/**PIX */}
            {qrcode.qr_codes[0].amount.value > 0 && (
                <div className="flex justify-center text-blue-100 mt-2">
                    {`Valor do PIX: R$ ${Number(qrcode.qr_codes[0].amount.value)}`}
                </div>
            )}
            <ITemsSaleForm
                items={items}
                setItemsSale={setItemsSale}
                msg={msg}
            />
        </div>
    </>
}