"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { TPerson } from "@/app/models/TPerson";
import { MsgMethodPay } from "./helpers/MsgMethodPay";

type Props = {
  onBack: () => void;
  onPix: (customer: TPerson) => void;
  onCard: (customer: TPerson) => void;
  customers: TPerson[];
  setCustomer: Dispatch<SetStateAction<TPerson>>;
  msg: string;
};

export default function PaymentMethod({
  onBack,
  onPix,
  onCard,
  customers,
  setCustomer,
  msg,
}: Props) {
  const [customerId, setCustomerId] = useState<number | "">("");

  const customerSelected = customers.find(
    (customer) => customer.id === Number(customerId),
  );

  useEffect(() => {
    if (customerSelected) setCustomer(customerSelected);
  }, [customerSelected]);

  function handlePix() {
    if (!customerSelected) {
      alert("Selecione um cliente antes de continuar.");
      return;
    }
    onPix(customerSelected);
  }

  function handleCard() {
    if (!customerSelected) {
      alert("Selecione um cliente antes de continuar.");
      return;
    }
    onCard(customerSelected);
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Título */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Pagamento</h2>
        <p className="text-sm text-gray-500 mt-1">
          Selecione o cliente e o método de pagamento.
        </p>
      </div>
      {/* CLIENTE */}
      <div className="mb-6 bg-white border rounded-xl p-4 shadow-sm">
        <label
          htmlFor="customer"
          className="block mb-2 font-semibold text-gray-700"
        >
          Selecionar o Cliente ou <span className="m-2 p-1 bg-gray-100 text-blue-700 shadow-sm"
          ><a href="\person">Incluir</a></span> um novo.
        </label>
        <select
          id="customer"
          value={customerId}
          onChange={(e) =>
            setCustomerId(e.target.value ? Number(e.target.value) : "")
          }
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione o cliente</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
              {customer.cpf ? ` - ${customer.cpf}` : ""}
            </option>
          ))}
        </select>
        {/* Cliente selecionado */}
        {customerSelected && (
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Cliente selecionado</p>
            <p className="font-semibold text-gray-800">
              {customerSelected.name}
            </p>
            {customerSelected.cpf && (
              <p className="text-sm text-gray-600">{customerSelected.cpf}</p>
            )}
          </div>
        )}
        <MsgMethodPay msg={msg} />
      </div>
      {/* MÉTODOS DE PAGAMENTO */}
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-gray-800">
          Método de pagamento
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* PIX */}
        <button
          type="button"
          onClick={handlePix}
          disabled={!customerSelected}
          className=" cursor-pointer flex flex-col items-center justify-center gap-3 min-h-[180] p-6 rounded-xl border bg-white shadow-sm transition hover:shadow-md hover:border-green-500 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="text-5xl">▣</div>
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-800">PIX</h3>
            <p className="text-sm text-gray-500">Pagamento instantâneo</p>
          </div>
        </button>
        {/* CARTÃO */}
        <button
          type="button"
          onClick={handleCard}
          disabled={!customerSelected}
          className=" cursor-pointer flex flex-col items-center justify-center gap-3 min-h-[180] p-6 rounded-xl border bg-white shadow-sm transition hover:shadow-md hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="text-5xl">▰</div>
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-800">Cartão</h3>
            <p className="text-sm text-gray-500">Crédito ou débito</p>
          </div>
        </button>
      </div>
      {/* VOLTAR */}
      <div className="mt-6">
        <button
          type="button"
          onClick={onBack}
          className="cursor-pointer w-full sm:w-auto px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
        >
          ← Voltar
        </button>
      </div>
    </div>
  );
}
