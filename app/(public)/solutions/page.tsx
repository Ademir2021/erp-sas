"use client";

import { useRouter } from "next/navigation";
import planos from "../checkout/[plano]/planos.json";

export default function Solutions() {
  const router = useRouter();

  function Card({
    titulo,
    descricao,
    preco,
    rota,
  }: {
    titulo: string;
    descricao: string;
    preco: string;
    rota: string;
  }) {
    return (
      <div className="bg-black p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-3">{titulo}</h2>
          <p className="text-gray-400 mb-4">{descricao}</p>
          <p className="text-3xl font-bold text-blue-500 mb-6">
            {preco}
            <span className="text-sm text-gray-400">/mês</span>
          </p>
        </div>

        <button
          onClick={() => router.push(rota)}
          className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          Contratar
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold text-center mb-10">
        Nossos Planos
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        <Card
          titulo={`${planos.basico.nome}`}
          descricao="Ideal para quem está começando. Inclui suporte básico e funcionalidades essenciais."
          preco={`R$ ${planos.basico.preco}`}
          rota="/checkout/basico"
        />

        <Card
          titulo={`${planos.pro.nome}`}
          descricao="Perfeito para negócios em crescimento. Inclui suporte prioritário e mais recursos."
          preco={`R$ ${planos.pro.preco}`} 
          rota="/checkout/pro"
        />

        <Card
          titulo={`${planos.premium.nome}`}
          descricao="Solução completa com todos os recursos, suporte dedicado e máxima performance."
          preco={`R$ ${planos.premium.preco}`}
          rota="/checkout/premium"
        />
      </div>
    </main>
  );
}