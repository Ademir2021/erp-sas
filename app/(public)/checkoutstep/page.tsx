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
import { TUser, UserRole } from "@/app/models/TUser";
import { useRouter } from "next/navigation";

import orderPayPalJSON from "../../json/orderPayPal.json";
import responsePayPalJSON from "../../json/responsePayPal.json";

export default function CheckoutStep() {
  const { user } = userAuth();
  const router = useRouter();

  const [orderPayPal, setOrderPayPal] = useState<TPayPalOrderResponse>(
    orderPayPalJSON as TPayPalOrderResponse,
  ); // captura o pedido mas ainda não aprovado
  const [responsePayPal, setResponsePayPal] = useState<TResponsePayPal>(
    responsePayPalJSON as TResponsePayPal,
  );

  const [msg, setMsg] = useState("");
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
      id: 0,
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

  useEffect(() => {
    const savedItems = localStorage.getItem("itemsSale");
    if (savedItems) {
      setItemsSale(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    setSale((prev) => ({
      ...prev,
      itemsSale,
    }));
  }, [itemsSale]);

  useEffect(() => {
    function loadUser() {
      if (user) {
        const userSale: TUser = {
          id: user.id,
          login: user.login,
        } as any;
        setSale({ ...sale, user: userSale });
      }
    }
    loadUser();
  }, [user]);

  useEffect(() => {
    if (person) {
      const personSale: TPerson = {
        id: person.id,
      } as any;
      setSale({ ...sale, person: personSale });
    }
  }, [person]);

  useEffect(() => {
    if (itemsSale.length > 0) {
      localStorage.setItem("itemsSale", JSON.stringify(itemsSale));
    } else {
      localStorage.removeItem("itemsSale");
    }
  }, [itemsSale]);

  useEffect(() => {
    const token = user?.token as string;
    loadHandle(token, setResponseImages, "images", router);
    loadHandle(token, setPersons, "person", router);
  }, [user]);

    const quantityTotal = itemsSale.reduce(
    (total, item) => total + item.amount,
    0,
  );

  const totalSale = itemsSale.reduce(
    (total, item: any) => total + item.tItem,
    0,
  );

  /**Funções para Envio da Venda */
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
    router.push("/sale");
    setMsg(`${resp.data.message} ID ${String(resp.data.id).padStart(6, "0")}`);
    const idSale = resp.data.id as number;
    setResponseIdSale(idSale);
    router.refresh();
  }

  function handleSaveSale() {
    if (responseIdSale === 0) {
      // loadItemsSale(sale);
      saveSale(sale);
    } else {
      setMsg("Esta venda já foi gravada");
    }
  }

  function hanldeSubmit(e: Event) {
    e.preventDefault();
    handleSaveSale();
  }

  return (
    <>
      {/* <pre className="bg-gray-600 p-4 rounded-lg text-xs overflow-auto max-h-96">
        {JSON.stringify(sale, null, 2)}
      </pre> */}
      <CheckoutStepForm
        itemsSale={itemsSale}
        responseImages={responseImages}
        setItemsSale={setItemsSale}
        person={persons}
        setPerson={setPerson as any}
        quantityTotal={quantityTotal}
        totalSale={totalSale}
      />
    </>
  );
}
