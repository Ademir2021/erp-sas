"use client";
import { Dispatch, SetStateAction, useState } from "react";

import { TItemsSale } from "@/app/models/TSale";
import PaypalCheckout from "../PaypalCheckout";
import { TPayPalOrderResponse } from "@/app/models/TPayPalOrderResponse";
import { TResponsePayPal } from "@/app/models/TResponsePayPal";
import { MsgMethodPay } from "./helpers/MsgMethodPay";

type Props = {
  itemsSale: TItemsSale[];
  onBack: () => void;
  onComplete: () => void;
  onError: () => void;
  totalSale: number;
  setPaymentPayPal: Dispatch<SetStateAction<TPayPalOrderResponse>>;
  setOrderPayPal: Dispatch<SetStateAction<TResponsePayPal>>;
  msg: string;
};

export default function CardPaymentForm({
  onBack,
  totalSale,
  setPaymentPayPal,
  setOrderPayPal,
  msg,
}: Props) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold text-gray-500 mb-6">
        Pagamento com cartão
      </h2>
      {/* Total */}
      <div className="bg-gray-100 rounded-lg p-4 mb-6">
        <div className="text-sm text-gray-500">Total da venda</div>

        <div className="text-3xl font-bold text-green-600">
          R$ {totalSale.toFixed(2)}
        </div>
      </div>
      {/**PayPal */}
      <PaypalCheckout
        amount={Number(totalSale).toFixed(2)}
        onSuccess={(details) => {
          setPaymentPayPal(details);
        }}
        orderSuccess={(details) => {
          setOrderPayPal(details);
        }}
      />
     {msg && <MsgMethodPay msg={msg} />}
      {/* Botões */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="flex-1 cursor-pointer border bg-gray-500 hover:bg-gray-300 text-gray-100 rounded-lg p-3"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
