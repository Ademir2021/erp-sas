"use client";

import { useParams, useRouter } from "next/navigation";
import planosJSON from './planos.json'
import { TPlano, TipoPlano } from "@/app/models/TPlanos";
import PlanosChecKoutForm from "@/app/components/Planos/PlanosCheckoutForm";
import { TCreditCart } from "@/app/models/TSale";
import { useEffect, useState } from "react";
import { TPagSeguroCard, TPagSeguroResponseCard, TPublicKey } from "@/app/models/TPagSeguroCard";
import { loadHandle } from "@/app/lib/handleApi";
import pagSeguroCardJSON from './pagSeguroCard.json'
import CreditCardForm from "@/app/components/Sale/CreditCardForm";
import { v4 as uuidv4 } from 'uuid';
import { TPerson } from "@/app/models/TPerson";

declare global {
  interface Window {
    PagSeguro?: any;
  }
}

export default function CheckoutPage() {

  const [person, setPerson] = useState<TPerson | null>(null)
  const [msgCreditCard, setMsgCreditCard] = useState('')
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
  const [creditCard, setCreditCard] = useState<TCreditCart>({
    public_key: "", holder: "", number: "",
    ex_month: "", ex_year: "", secure_code: "", encrypted: "",
    installments: 1, payment: 0
  });
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

  useEffect(() => {
    if (!plano || !person) return;
    const {
      name,
      email,
      cpf,
      cnpj,
      phone = "",
      address,
    } = person;
    const city = address?.zipCode?.city;
    const state = city?.state;
    const country = city?.country;
    const phoneDDD = phone.slice(0, 2);
    const phoneNumber = phone.substring(2);
    const valorCentavos = Math.round(Number(creditCard?.payment || 0) * 100);
    const updatedPagSeguroCard = {
      ...pagSeguroCard,
      reference_id: uuidv4(),
      description: plano.descricao,
      customer: {
        ...pagSeguroCard.customer,
        name: name?.toString(),
        email: email?.toString(),
        tax_id: cpf?.toString() || cnpj?.toString(),
        phones: [
          {
            country: country?.ddi?.toString() || "55",
            area: phoneDDD,
            number: phoneNumber,
            type: "MOBILE",
          },
        ],
      },
      shipping: {
        ...pagSeguroCard.shipping,
        address: {
          ...pagSeguroCard.shipping.address,
          street: address?.street?.toString(),
          number: address?.number?.toString(),
          complement: address?.complement?.toString(),
          locality: address?.neighborhood?.toString(),
          city: city?.name?.toString() || "Barbosa Ferraz",
          region_code: state?.acronym?.toString() || "PR",
          country: country?.acronym?.toString() || "BRA",
          postal_code: address?.zipCode?.code?.replace(/\D/g, ""),
        },
      },
      charges: [
        {
          ...pagSeguroCard.charges[0],
          reference_id: uuidv4(),
          description: plano.descricao,
          amount: {
            value: valorCentavos,
            currency: "BRL"
          },
          payment_method: {
            ...pagSeguroCard.charges[0].payment_method,
            installments: creditCard.installments,
            holder: {
              name: name?.toString(),
              tax_id: cpf?.toString(),
            },
          },
        },
      ],
      items: [
        {
          reference_id: "1",
          name: plano.nome?.toString(),
          quantity: 1,
          unit_amount: Math.round(Number(plano.preco) * 100),
        },
      ],
    };
    setPagSeguroCard(updatedPagSeguroCard as TPagSeguroCard);
  }, [plano, person, creditCard.installments, creditCard.payment]);

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
      const encrypted = await window.PagSeguro.encryptCard({
        publicKey: publicKey.public_key,
        holder: creditCard.holder,
        number: creditCard.number,
        expMonth: creditCard.ex_month,
        expYear: creditCard.ex_year,
        securityCode: creditCard.secure_code,
      });
      if (encrypted) {
        // pagSeguroCard.charges[0].payment_method.card.encrypted = encrypted.encryptedCard
        // setCreditCard(prev => ({ ...prev, encrypted: encrypted.encryptedCard }))
        setCreditCard(prev => ({
          ...prev,
          encrypted: encrypted.encryptedCard
        }));
        registerPagSeguroCard()
      }
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
      const data: TPagSeguroResponseCard = await response.json(); //mudar para TPagSeguroResponse se a resposta for consistente
      const charge = data?.charges?.[0];
      if (!charge) {
        throw new Error("Resposta inválida do PagSeguro");
      }
      switch (charge.status) {
        case "PAID":
          setMsgCreditCard(`Pagamento aprovado! ID: ${charge.id ? charge.id : 'N/A'}`);
          setResponsePagSeguroCard(data);
          clearPlano();
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

  function handleSubmitCreditCard(e: Event) {
    e.preventDefault()
    sdkPagSeguro()
  }

  function handlePagamento() {
    localStorage.setItem("url_plano", window.location.pathname);
    router.push('/person')
  }

  return (<>
    <p>{JSON.stringify(pagSeguroCard.charges[0].amount.currency)}</p>
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