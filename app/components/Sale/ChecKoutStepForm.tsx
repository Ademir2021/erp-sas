"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { TItemsSale } from "@/app/models/TSale";
import ItemsInTheCardForm from "./ItemsInTheCardForm";
import { TResponseImages } from "@/app/models/TItem";
import { useRouter } from "next/navigation";

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
  setItemsSale: Dispatch<SetStateAction<TItemsSale[]>>
  responseImages:TResponseImages[]
};

export default function CheckoutStepForm({
    itemsSale,
    setItemsSale,
    responseImages
}: Props) {

  const [checkoutStep, setCheckoutStep] =
    useState<CheckoutStep>("itemsInTheCard");
  function nextStep(step: CheckoutStep) {
    setCheckoutStep(step);
  }

  const router = useRouter()

  if(checkoutStep == 'itemsSale'){
    router.push('store')
    router.refresh()
  }

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
        />
      )}

      {checkoutStep === "paymentMethod" && (
        // <PaymentMethod
        //   onBack={() => nextStep("itemsInTheCard")}
        //   onPix={() => nextStep("pix")}
        //   onCard={() => nextStep("card")}
        // />
        <p>PaymentMethod</p>
      )}

      {checkoutStep === "pix" && (
        // <PixPayment
        //   itemsSale={itemsSale}
        //   onBack={() => nextStep("paymentMethod")}
        //   onComplete={() => nextStep("completeSale")}
        //   onError={() => nextStep("saleNotCompleted")}
        // />
        <p>Pix Payment</p>
      )}

      {checkoutStep === "card" && (
        // <CardPayment
        //   itemsSale={itemsSale}
        //   onBack={() => nextStep("paymentMethod")}
        //   onComplete={() => nextStep("completeSale")}
        //   onError={() => nextStep("saleNotCompleted")}
        // />
        <p>CardPament</p>
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
