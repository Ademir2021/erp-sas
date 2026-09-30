"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TItemsSale } from "@/app/models/TSale";
import ItemsInTheCardForm from "./ItemsInTheCardForm";
import { TResponseImages } from "@/app/models/TItem";
import { useRouter } from "next/navigation";
import PaymentMethodForm from "./PaymentMethodForm";
import { TPerson } from "@/app/models/TPerson";
import PixPayment from "./PixPayment";
import CardPaymentForm from "./CardPaymentForm";
import { TPayPalOrderResponse } from "@/app/models/TPayPalOrderResponse";
import { TResponsePayPal } from "@/app/models/TResponsePayPal";

type CheckoutStep =
  | "itemsSale"
  | "itemsInTheCard"
  | "paymentMethod"
  | "pix"
  | "card"
  | "completeSale"
  | "saleCompleted"
  | "saleNotCompleted";

type Props = {
  itemsSale: TItemsSale[];
  setItemsSale: Dispatch<SetStateAction<TItemsSale[]>>;
  responseImages: TResponseImages[];
  person: TPerson[];
  setPerson: Dispatch<SetStateAction<TPerson>>;
  quantityTotal: number;
  totalSale: number;
  setPaymentPayPal: Dispatch<SetStateAction<TPayPalOrderResponse>>;
  setOrderPayPal: Dispatch<SetStateAction<TResponsePayPal>>;
  msg:string
};

export default function CheckoutStepForm({
  itemsSale,
  setItemsSale,
  responseImages,
  person,
  setPerson,
  quantityTotal,
  totalSale,
  setPaymentPayPal,
  setOrderPayPal,
  msg
}: Props) {
  const [checkoutStep, setCheckoutStep] =
    useState<CheckoutStep>("itemsInTheCard");
  function nextStep(step: CheckoutStep) {
    setCheckoutStep(step);
  }

  const router = useRouter();

  useEffect(() => {
    if (checkoutStep === "itemsSale") {
      router.push("/store");
    }
  }, [checkoutStep, router]);

  return (
    <div className="w-full">
      {checkoutStep === "itemsSale" && (
        // <ItemsSale
        //   itemsSale={itemsSale}
        //   setItemsSale={setItemsSale}
        //   onNext={() => nextStep("itemsInTheCard")}
        // />
        <a href="store" >Store</a>
      )}

      {checkoutStep === "itemsInTheCard" && (
        <ItemsInTheCardForm
          itemsSale={itemsSale}
          onBack={() => nextStep("itemsSale")}
          onNext={() => nextStep("paymentMethod")}
          responseImages={responseImages}
          setItemsSale={setItemsSale}
          quantityTotal={quantityTotal}
          totalSale={totalSale}
        />
      )}

      {checkoutStep === "paymentMethod" && (
        <PaymentMethodForm
          onBack={() => nextStep("itemsInTheCard")}
          onPix={() => nextStep("pix")}
          onCard={() => nextStep("card")}
          customers={person}
          setCustomer={setPerson}
          msg={msg}
        />
      )}

      {checkoutStep === "pix" && (
        <PixPayment
          itemsSale={itemsSale}
          onBack={() => nextStep("paymentMethod")}
          onComplete={() => nextStep("completeSale")}
          onError={() => nextStep("saleNotCompleted")}
          totalSale={totalSale}
          msg={msg}
        />
      )}

      {checkoutStep === "card" && (
        <CardPaymentForm
          itemsSale={itemsSale}
          onBack={() => nextStep("paymentMethod")}
          onComplete={() => nextStep("completeSale")}
          onError={() => nextStep("saleNotCompleted")}
          totalSale={totalSale}
          setOrderPayPal={setOrderPayPal}
          setPaymentPayPal={setPaymentPayPal}
          msg={msg}
        />
      )}

      {checkoutStep === "completeSale" && (
        // <CompleteSale
        //   itemsSale={itemsSale}
        //   onSuccess={() => nextStep("saleCompleted")}
        //   onError={() => nextStep("saleNotCompleted")}
        // />
        <p>Completed Sale</p>
      )}

      {checkoutStep === "saleCompleted" && (
        // <SaleCompleted
        //   onNewSale={() => {
        //     setItemsSale([]);
        //     nextStep("itemsSale");
        //   }}
        // />
        <p>Sale Completed</p>
      )}

      {checkoutStep === "saleNotCompleted" && (
        // <SaleNotCompleted
        //   onTryAgain={() => nextStep("paymentMethod")}
        //   onBack={() => nextStep("itemsInTheCard")}
        // />
        <p>Sale Not Completed</p>
      )}
    </div>
  );
}
