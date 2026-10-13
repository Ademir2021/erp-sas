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
          className="mt-4 cursor-pointer bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          Contratar
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white p-6">

      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
  <header className="mb-8 text-center">
    <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-blue-600">
      Nossos planos
    </span>

    <h1 className="text-3xl font-bold tracking-tight text-gray-200 sm:text-4xl">
      Escolha o plano ideal para o seu negócio
    </h1>

    <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
      Conheça nossas opções e encontre a solução mais adequada
      para sua empresa. Vamos entender suas necessidades e definir
      a melhor forma de atender você.
    </p>
  </header>

  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Segmentos de atuação
      </h2>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        Atendemos empresas de diferentes setores do mercado.
      </p>
    </div>

    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {[
        "Mercados e supermercados",
        "Açougues e padarias",
        "Distribuidoras",
        "Lojas de conveniência",
        "Farmácias",
        "Relojoarias",
        "Lanchonetes",
        "Assistências técnicas",
        "Materiais de construção",
        "Materiais elétricos",
        "Hotéis e restaurantes",
        "Brinquedos",
        "Conveniências",
        "Ferreagens",
        "Lojas de Confecções",
        "Lojas de Varejo",
        "Comercio em Geral"
      ].map((segmento) => (
        <li
          key={segmento}
          className="flex items-center gap-3 rounded-lg
                     bg-gray-50 px-4 py-3 text-sm
                     font-medium text-gray-700
                     transition-colors hover:bg-blue-50
                     hover:text-blue-700"
        >
          <span
            className="flex h-6 w-6 shrink-0 items-center
                       justify-center rounded-full bg-blue-100
                       text-blue-600"
            aria-hidden="true"
          >
            ✓
          </span>

          {segmento}
        </li>
      ))}
    </ul>
  </div>

  <hr className="my-8 border-gray-200" />
<p className="mt-2 text-sm leading-6 text-gray-600">
  Contrate um plano para dar o primeiro passo e iniciar com a solução ideal para o seu negócio.
</p>
</section>

     
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