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
  const [pagSeguroCard, setPagSeguroCard] = useState<TPagSeguroCard>(pagSeguroCardJSON as any)
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
    loadHandle('token', setPublicKey, 'pagseguropublickey', router)
  }, [person]);

  useEffect(() => {
    // const phone = person?.phone?.replace(/\D/g, '') || '';
    const valorReais = creditCard?.payment; // transforma string em número
    const valorCentavos = Math.round(valorReais * 100); // transforma em centavos e arredonda

    if (plano) {
      setPagSeguroCard(prev => {
        const charges = [...(prev.charges || [])]

        if (charges.length === 0) {
          charges.push({
            amount: { value: valorCentavos },
            payment_method: {
              installments: creditCard.installments
            },
            holder:{
              tax_id:person?.cpf,
              name:person?.name
            }
          } as any)
        } else {
          charges[0] = {
            ...charges[0],
            amount: {
              ...charges[0].amount,
              value: plano.preco,
            },
            payment_method: {
              installments: creditCard.installments
            } as any
          }
        };
        const items = [...(prev.items || [])]
        if (items.length === 0) {
          items.push({
            name: plano.nome,
            amount: 1,
            amount_unit: plano.preco
          } as any)
        } else {
          items[0] = {
            ...items[0],
            name: plano.nome,
            amount: 1,
            amount_unit: plano.preco
          } as any
        }

        return {
          ...prev,
          reference_id:uuidv4(),
          description: plano.descricao,
          customer: {
            name: person?.name,
            email: person?.email,
            tax_id: person?.cpf || person?.cnpj,
            phones: [
              {
                country: person?.address.zipCode?.city?.country.ddi || "55",
                area: person?.phone.slice(0, -9).toString() as any,
                number: person?.phone.substring(2) as any,
                type: "MOBILE"
              }
            ]
          } as any,
          shipping: {
            address: {
              street: person?.address.street.toString(),
              number: person?.address.number || '0',
              complement: person?.address.complement,
              locality: person?.address.neighborhood,
              city: person?.address.zipCode?.city?.name,
              region_code: person?.address.zipCode?.city?.state?.acronym,
              country: person?.address.zipCode?.city?.country?.acronym,
              postal_code: person?.address.zipCode?.code?.replace(/\D/g, '')
            }
          } as any,
          charges,
          items
        }
      })
    }
  }, [plano, creditCard.installments, person])

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
        pagSeguroCard.charges[0].payment_method.card.encrypted = encrypted.encryptedCard
        // pagSeguroCard.charges[0].amount.value = plano.preco
        registerPagSeguroCard()
      }
      if (encrypted.hasErrors === true) {
        setMsgCreditCard(JSON.stringify(encrypted.errors[0].code))
      }
    } catch (err: unknown) {
      setMsgCreditCard('ErroEncryptCard: ' + err)
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
      const data: TPagSeguroResponseCard = await response.json(); //mudar para TPagSeguroResponse se a resposta for consistente
      const charge = data?.charges?.[0];
      if (!charge) {
        throw new Error("Resposta inválida do PagSeguro");
      }
      switch (charge.status) {
        case "PAID":
          setMsgCreditCard(`Pagamento aprovado! ID: ${charge.id ? charge.id : 'N/A'}`);
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
    localStorage.removeItem("url_plano");
    localStorage.removeItem("person");
  }

  function handlePagamento() {
    localStorage.setItem("url_plano", window.location.pathname);
    router.push('/person')
  }

  return (<>
    {/* <p>{JSON.stringify(publicKey)}</p> */}
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