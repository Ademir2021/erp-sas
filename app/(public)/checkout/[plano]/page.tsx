"use client";

import { useParams, useRouter } from "next/navigation";
import planosJSON from './planos.json'
import { TPlano, TipoPlano } from "@/app/models/TPlanos";
import PlanosChecKoutForm from "@/app/components/Planos/PlanosCheckoutForm";
import { TCreditCart, TOperationSale, TSale } from "@/app/models/TSale";
import { useEffect, useState } from "react";
import { TPagSeguroCard, TPagSeguroResponseCard, TPublicKey } from "@/app/models/TPagSeguroCard";
import { loadHandle } from "@/app/lib/handleApi";
import pagSeguroCardJSON from '../../../json/pagSeguroCard.json';
import CreditCardForm from "@/app/components/Sale/CreditCardForm";
import { v4 as uuidv4 } from 'uuid';
import { TPerson } from "@/app/models/TPerson";
import { mapFieldsPagSeguroCard } from "@/app/(private)/sale/handlePagSeguro";
import PaypalCheckout from "../../../components/PaypalCheckout";
// import { TPaypalErrorResponse } from "@/app/models/TPayPalErrorResponse"
import { TPayPalOrderResponse } from "@/app/models/TPayPalOrderResponse"
// import paymentPayPalJSON from '../../json/paymentPayPal.json'
import orderPayPalJSON from '../../../json/orderPayPal.json'
import responsePayPalJSON from '../../../json/responsePayPal.json'
import { TResponsePayPal } from "@/app/models/TResponsePayPal"

declare global {
  interface Window {
    PagSeguro?: any;
  }
}

export default function CheckoutPage() {

  const [orderPayPal, setOrderPayPal] = useState<TPayPalOrderResponse>(orderPayPalJSON as TPayPalOrderResponse) // caputa o peido mas ainda não aprovado
  const [responsePayPal, setResponsePayPal] = useState<TResponsePayPal>(responsePayPalJSON as TResponsePayPal)

  const [msg, setMsg] = useState('')

  const [person, setPerson] = useState<TPerson | null>(null)
  const [msgCreditCard, setMsgCreditCard] = useState('')
  const [publicKey, setPublicKey] = useState<TPublicKey>({
    public_key: '', created_at: ''
  })
  const [pagSeguroCard, setPagSeguroCard] = useState<TPagSeguroCard>(pagSeguroCardJSON as TPagSeguroCard);
  const [responsePagSeguroCard, setResponsePagSeguroCard] = useState<TPagSeguroResponseCard>({
    id: "", charges: [{
      id: "", reference_id: "", status: 'PENDING',
      created_at: "", paid_at: "", description: ""
    }]
  });
  const initialCreditCard: TCreditCart = {
    public_key: "", holder: "", number: "",
    ex_month: "", ex_year: "", secure_code: "", encrypted: "",
    installments: 1, payment: 0
  }
  const [creditCard, setCreditCard] = useState<TCreditCart>(initialCreditCard);
  const planos: Record<TipoPlano, TPlano> = planosJSON
  const params = useParams();
  const router = useRouter();
  const res = params.plano as keyof typeof planos;
  const plano: TPlano = planos[res];

  if (!plano) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        Plano não encontrado
      </div>
    );
  }

  function clearCreditCard() {
    setCreditCard({ ...initialCreditCard });
  }

  useEffect(() => {
    if (person == null) {
      const res = JSON.parse(localStorage.getItem("person") as any);
      if (res)
        setPerson(res)
    }
  }, [person])

  useEffect(() => {
    const script = document.createElement("script");
    script.src = process.env.NEXT_PUBLIC_SDK_PAGSEGURO as string;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    loadHandle('permitAll()', setPublicKey, 'pagseguropublickey', router)
  }, [person]);

  const sale: TSale = {
    user: { login: person?.email },
    person: { ...person, address: person?.address || '' }
  } as any
  const itemsSale = [{ item: { id: uuidv4() as any, name: plano?.nome }, amount: 1, price: plano.preco }]
  const operationSale = { description: plano?.descricao } as TOperationSale
  function getPagSeguroCard() {
    setPagSeguroCard(prev =>
      mapFieldsPagSeguroCard({
        p: prev,
        sale,
        operationSale,
        creditCard,
        person: person as TPerson,
        itemsSale: itemsSale as any,
      })
    )
  };
  useEffect(() => {
    getPagSeguroCard()
  }, [creditCard, person]
  );

  useEffect(() => {
    setCreditCard(prev => ({
      ...prev,
      payment: plano.preco
    }))
  }, [plano])

  const sdkPagSeguro = async () => {
    if (!window.PagSeguro || !publicKey) {
      setMsgCreditCard("SDK não carregado corretamente.");
      return;
    }
    try {
      const { holder, number, ex_month,
        ex_year, secure_code }: TCreditCart = creditCard
      const encrypted = await window.PagSeguro.encryptCard({
        publicKey: publicKey.public_key,
        holder: holder,
        number: number,
        expMonth: ex_month,
        expYear: ex_year,
        securityCode: secure_code,
      });
      if (encrypted) {
        const updateEncriptedCard = encrypted.encryptedCard
        getPagSeguroCard()
        pagSeguroCard.charges[0].payment_method.card = updateEncriptedCard
        registerPagSeguroCard()
      };
      if (encrypted.hasErrors === true) {
        setMsgCreditCard(JSON.stringify(encrypted.errors[0].code))
      }
    } catch (err: unknown) {
      setMsgCreditCard('ErroEncryptCard: ' + err)
    }
  };

  function clearPlano() {
    localStorage.removeItem("url_plano");
    localStorage.removeItem("person");
    router.push('/')
  }

  useEffect(() => {
    if (responsePayPal.status === "COMPLETED"){
      clearPlano()
      setMsg(responsePayPal.purchase_units[0].payments.captures[0].id!)
    }
  }, [responsePayPal])

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
      const data: TPagSeguroResponseCard = await response.json();
      const charge = data?.charges?.[0]
      if (!charge) {
        throw new Error("Resposta inválida do PagSeguro");
      }
      const msgStatus = charge.status;
      if (msgStatus === "PAID") {
        setMsgCreditCard(`Pagamento aprovado! ID: ${charge.id ? charge.id : 'N/A'}`);
        setResponsePagSeguroCard(data);
        clearPlano();
      } else if (msgStatus === "DECLINED") {
        setMsgCreditCard("Pagamento recusado. verifique os dados do cartão.");
      } else if (msgStatus === "CANCELED") {
        setMsgCreditCard("Pagamento cancelado.");
      } else if (msgStatus === "AUTHORIZED") {
        setMsgCreditCard("Pagamento autorizado, aguardando captura.");
      } else if (msgStatus === "PENDING") {
        setMsgCreditCard("Pagamento pendente. aguardando processamento.");
      } else {
        setMsgCreditCard("Status desconhecido do pagamento.");
        console.warn("Status inesperado:", msgStatus, data);
      }
    } catch (error: any) {
      console.error("Erro geral:", error);
      setMsgCreditCard(`Erro: ${error.message || error}`);
    }
  }

  function handleSubmitCreditCard(e: Event) {
    e.preventDefault()
    sdkPagSeguro()
  }

  function handlePagamento() {
    localStorage.setItem("url_plano", window.location.pathname);
    router.push('/person')
  }

  return (<>
    {/* <p>{JSON.stringify(responsePayPal)}</p> */}
    {!person && <PlanosChecKoutForm
      plano={plano}
      handlePagamento={handlePagamento}
    />}
    {/* {person && <CreditCardForm
      creditCard={creditCard}
      setCreditCard={setCreditCard}
      msgCreditCard={msgCreditCard}
      handleSubmitCreditCard={handleSubmitCreditCard}
      plano={plano}
    />} */}
    {person && <main className="p-10">
      <p className="flex justify-center p-3 font-bold">Concluir Pagamento</p>
      <PaypalCheckout
        amount={Number(plano.preco).toFixed(2)}
        onSuccess={(details) => {
          setResponsePayPal(details);
        }}
        orderSuccess={(details) => {
          setOrderPayPal(details)
        }}
        />
        <span className="flex justify-center text-red-700"
        >{msg && `Pagamento Confirmado: ${msg}`}</span>
    </main>}
  </>
  );
}