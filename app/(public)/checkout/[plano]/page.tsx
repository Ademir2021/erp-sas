"use client";

import { useParams, useRouter } from "next/navigation";
import planosJSON from './planos.json'
import { TPlano, TipoPlano } from "@/app/models/TPlanos";
import PlanosChecKoutForm from "@/app/components/Planos/PlanosCheckoutForm";
import { TCreditCart, TItemsSale, TOperationSale, TSale } from "@/app/models/TSale";
import { useEffect, useState } from "react";
import { TPagSeguroCard, TPagSeguroResponseCard, TPublicKey } from "@/app/models/TPagSeguroCard";
import { loadHandle } from "@/app/lib/handleApi";
import pagSeguroCardJSON from './pagSeguroCard.json';
import CreditCardForm from "@/app/components/Sale/CreditCardForm";
import { v4 as uuidv4 } from 'uuid';
import { TPerson } from "@/app/models/TPerson";
import { mapFieldsPagSeguroCard } from "@/app/(private)/sale/handlePagSeguro";

declare global {
  interface Window {
    PagSeguro?: any;
  }
}

export default function CheckoutPage() {

  const [person, setPerson] = useState<TPerson | null>(null)
  const [msgCreditCard, setMsgCreditCard] = useState('')
  const [encrypted, setEncrypted] = useState('')
  const [publicKey, setPublicKey] = useState<TPublicKey>({
    public_key: '', created_at: ''
  })
  const pagSeguroCard_: any = pagSeguroCardJSON
  const [pagSeguroCard, setPagSeguroCard] = useState<TPagSeguroCard>(pagSeguroCard_)
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
        encrypted
      })
    )
  };
  useEffect(() => {
    getPagSeguroCard()
  }, [creditCard, person, encrypted]
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
        setEncrypted(updateEncriptedCard)
        getPagSeguroCard()
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
      const data: TPagSeguroResponseCard = await response.json();
      const charge = data?.charges?.[0]
      if (!charge) {
        throw new Error("Resposta inválida do PagSeguro");
      }
      switch (charge.status) {
        case "PAID":
          setMsgCreditCard(`Pagamento aprovado! ID: ${charge.id ? charge.id : 'N/A'}`);
          setResponsePagSeguroCard(data);
          clearPlano();
          clearCreditCard();
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
    {/* <p>{JSON.stringify(pagSeguroCard)}</p> */}
    {!person && <PlanosChecKoutForm
      plano={plano}
      handlePagamento={handlePagamento}
    />}
    {person && <CreditCardForm
      creditCard={creditCard}
      setCreditCard={setCreditCard}
      msgCreditCard={msgCreditCard}
      handleSubmitCreditCard={handleSubmitCreditCard}
      plano={plano}
    />}
  </>
  );
}