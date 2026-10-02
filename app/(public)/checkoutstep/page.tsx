"use client";
import { useEffect, useState } from "react";

import CheckoutStepForm from "@/app/components/Sale/ChecKoutStepForm";
import { loadHandle } from "@/app/lib/handleApi";
import { userAuth } from "@/app/lib/userAuth";
import { TResponseImages } from "@/app/models/TItem";
import { TResponseMessage } from "@/app/models/TMessage";
import { TPayPalOrderResponse } from "@/app/models/TPayPalOrderResponse";
import { TPerson } from "@/app/models/TPerson";
import { TResponsePayPal } from "@/app/models/TResponsePayPal";
import { TItemsSale, TSale } from "@/app/models/TSale";
import { UserRole } from "@/app/models/TUser";
import { useRouter } from "next/navigation";
import orderPayPalJSON from "../../json/orderPayPal.json";
import responsePayPalJSON from "../../json/responsePayPal.json";
import { TAccountsReceivable } from "@/app/models/TAccountsReceivable";
import { setDays } from "@/app/lib/momentDays";
import { LoadLocalStorge } from "../checkoutstore/helpers/loadLocalStorage";
import pagSeguroPixJSON from "../../json/pagSeguroPix.json";
import { TPagSeguroPix, TResponsePixQRCode } from "@/app/models/TPagSeguroPix";
import { mapFieldsPagSeguroPix, registerPagSeguroPIX } from "@/app/(private)/sale/handlePagSeguro";

export default function CheckoutStep() {
  const [qrcodePagSeguro, setQrcode] = useState<TResponsePixQRCode>({
    id: "",
    qr_codes: [{ id: "", text: "", amount: { value: 0 } }],
    error_messages: [{ code: "", description: "", parameter_name: "" }],
  });
  const qrCodeValue = qrcodePagSeguro.qr_codes[0].amount.value;
  const qrCodeId = qrcodePagSeguro.id || "id não gerado";
  const [pagSeguroPix, setPagSeguroPix] = useState<TPagSeguroPix>(
    pagSeguroPixJSON as TPagSeguroPix,
  );
  const [installmentAccount, setInstallmentAccount] = useState(0);
  const [cash, setCash] = useState(0);
  const [orderPayPal, setOrderPayPal] = useState<TPayPalOrderResponse>(
    orderPayPalJSON as TPayPalOrderResponse,
  ); // captura o pedido mas ainda não aprovado
  const [responsePayPal, setResponsePayPal] = useState<TResponsePayPal>(
    responsePayPalJSON as TResponsePayPal,
  );
  const payPalId = responsePayPal.purchase_units[0].payments.captures[0].id;
  const { user } = userAuth();
  const router = useRouter();
  const [msg, setMsg] = useState("Conclua sua compra");
  const [responseIdSale, setResponseIdSale] = useState(0);
  const [persons, setPersons] = useState<TPerson[]>([]);
  const [person, setPerson] = useState<TPerson | null>();
  const [itemsSale, setItemsSale] = useState<TItemsSale[]>([]);
  const [responseImages, setResponseImages] = useState<TResponseImages[]>([]);
  const [sale, setSale] = useState<TSale>({
    branch: { id: 1, name: "" },
    user: {
      id: 0,
      login: "",
      password: "",
      role: "USER" as UserRole,
      token: "",
    },
    person: { id: 0 },
    tSale: 0,
    discount: 0,
    itemsSale: [],
    operationSale: {
      id: 2,
      description: "",
      type: "",
      controlsStock: false,
      generateFinancial: false,
      allowDiscount: false,
      updateCost: false,
      finalConsumer: true,
      requiresInvoice: false,
      isReturn: false,
      cfop: "",
      defaultNature: "",
      active: true,
    },
    accountsReceivable: [],
  });

  const quantityTotal = itemsSale.reduce(
    (total, item) => total + item.amount,
    0,
  );

  const totalSale = itemsSale.reduce(
    (total, item: any) => total + item.tItem,
    0,
  );

  const loadLocalStorage = new LoadLocalStorge();

  useEffect(() => {
    const token = user?.token as string;
    loadHandle(token, setPersons, "person", router);
  }, [user]);

  useEffect(() => {
    loadHandle("permitAll()", setResponseImages, "images", router);
  }, []);

  useEffect(() => {
    // Atualiza o estado do QR Code quando qrCodeValue muda
    setQrcode({ ...qrcodePagSeguro });
  }, [qrCodeValue]);

  const newAccountsReceivable: TAccountsReceivable[] = [
    {
      id: 0,
      createdAt: new Date(),
      updatedAt: null,
      branch: { id: 1 },
      user: { id: user?.id || 0 },
      payer: { id: person?.id || 0 },
      sale: { id: 0 },
      value: totalSale,
      receivedValue: 0,
      balance: totalSale,
      dueDate: setDays(0) as any,
      cancel: false,
      description: "",
      situation: "OPEN",
      observations: "CHECKOUT STEP",
      lateFee: 0,
      interest: 0,
      discount: 0,
      type: "CASH",
      idTypeOperation: payPalId ? payPalId : qrCodeId,
      descriptionTypeOperation: "Parcela unica",
    },
  ];

  useEffect(() => {
    setSale((prev: any) => {
      const newSale = {
        ...prev,
        itemsSale,
        accountsReceivable: newAccountsReceivable,
        user: user ? { id: user.id, login: user.login } : prev.user,
        person: person ? { id: person.id } : prev.person,
        tSale: totalSale,
      };
      setSale(newSale);
      return newSale;
    });
  }, [
    itemsSale,
    user,
    person,
    responsePayPal,
    totalSale,
    qrcodePagSeguro,
    qrCodeValue,
    qrCodeId,
  ]);

  useEffect(() => {
    loadLocalStorage.loadsetLocalStorage(setItemsSale);
  }, []);

  useEffect(() => {
    loadLocalStorage.loadgetLocalStorage(itemsSale);
  }, [itemsSale]);

  /**Função para envio da venda */
  async function saveSale(sale: TSale) {
    const res = await fetch("/api/sale", {
      method: "POST",
      body: JSON.stringify(sale),
    });
    const resp: TResponseMessage = await res.json();
    if (!res.ok) {
      setMsg(`Erro ao registrar Venda: ${JSON.stringify(resp)}`);
      return;
    }
    router.push("/checkoutstep");
    setMsg(`${resp.data.message} ID ${String(resp.data.id).padStart(6, "0")}`);
    const idSale = resp.data.id as number;
    setResponseIdSale(idSale);
    router.refresh();
  }

  function handleSaveSale() {
    if (responseIdSale === 0) {
      saveSale(sale);
    } else {
      setMsg("Esta venda já foi gravada");
    }
  }

  useEffect(() => {
    if (responsePayPal || qrCodeValue > 0) {
      if (responsePayPal.status === "COMPLETED" || qrCodeValue > 0) {
        handleSaveSale();
      }
    }
  }, [responsePayPal, person, qrcodePagSeguro]);

  /** Funções para envio do pagamento via pagSeguro PIX */
  const getPagSeguroPix = () => {
    setPagSeguroPix((prev) =>
      mapFieldsPagSeguroPix({
        p: prev,
        sale,
        operationSale: sale.operationSale,
        person: person as TPerson,
        itemsSale,
        cash,
      }),
    );
  };
  useEffect(() => {
    getPagSeguroPix();
  }, [sale, person, itemsSale, cash]);

  function handleSubmitPix(e: Event) {
    e.preventDefault();
    getPagSeguroPix();
    registerPagSeguroPIX(
      pagSeguroPix,
      setQrcode,
      setMsg,
      setInstallmentAccount,
    );
  }

  return (
    <>
      {/* <pre className="bg-gray-600 p-4 rounded-lg text-xs overflow-auto max-h-96">
        {JSON.stringify(qrcodePagSeguro.id, null, 2)}
      </pre> */}
      <CheckoutStepForm
        itemsSale={itemsSale}
        responseImages={responseImages}
        setItemsSale={setItemsSale}
        person={persons}
        setPerson={setPerson as any}
        quantityTotal={quantityTotal}
        totalSale={totalSale}
        setOrderPayPal={setOrderPayPal as any}
        setPaymentPayPal={setResponsePayPal as any}
        msg={msg}
        qrcode={qrcodePagSeguro}
        handleSubmitPix={handleSubmitPix}
      />
    </>
  );
}
