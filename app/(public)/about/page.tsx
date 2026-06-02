import { globalStyles_form } from "@/app/components/GlobalStyles";
import pkg from "../../../package.json";
export default function About() {
  return (
   <div className="max-w-3xl mx-auto bg-zinc-900 text-white rounded-2xl shadow-2xl p-8 border border-zinc-700">

  {/* Cabeçalho */}
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-3">
      <span className="text-4xl">🚀</span>

      <div>
        <h1 className="text-3xl font-bold bg-gradient-to from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Sobre o ERP
        </h1>

        <p className="text-sm text-gray-400">
          Sistema de Gestão Empresarial
        </p>
      </div>
    </div>

    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
      v{pkg.version}
    </span>
  </div>

  <div className="h-px bg-zinc-700 mb-6" />

  {/* Informações */}
  <div className="grid md:grid-cols-2 gap-4">

    <div className="bg-zinc-800 rounded-xl p-4 border border-zinc-700">
      <p className="text-gray-400 text-sm">Sistema</p>

      <p className="text-yellow-400 text-lg font-bold uppercase">
        {pkg.name}
      </p>
    </div>

    <div className="bg-zinc-800 rounded-xl p-4 border border-zinc-700">
      <p className="text-gray-400 text-sm">Versão Atual</p>

      <p className="text-green-400 text-lg font-bold">
        {pkg.version}
      </p>
    </div>

  </div>

  {/* Descrição */}
  <div className="mt-4 bg-zinc-800 rounded-xl p-5 border border-zinc-700">
    <h2 className="text-blue-400 font-bold mb-2">
      📋 Descrição
    </h2>

    <p className="text-gray-300 leading-relaxed">
      Esta aplicação ERP foi desenvolvida para gerenciamento de
      clientes, produtos, estoque, vendas e relatórios,
      oferecendo uma experiência moderna, rápida e intuitiva.
    </p>
  </div>

  {/* Recursos */}
  <div className="mt-8">
    <h2 className="text-2xl font-bold text-blue-400 mb-4">
      ⚙️ Recursos do ERP
    </h2>

    <div className="grid md:grid-cols-2 gap-3">

      <div className="bg-zinc-800 p-3 rounded-lg hover:bg-zinc-700 transition">
        👥 Gerenciamento de clientes
      </div>

      <div className="bg-zinc-800 p-3 rounded-lg hover:bg-zinc-700 transition">
        📦 Gerenciamento de produtos
      </div>

      <div className="bg-zinc-800 p-3 rounded-lg hover:bg-zinc-700 transition">
        🏪 Controle de estoque
      </div>

      <div className="bg-zinc-800 p-3 rounded-lg hover:bg-zinc-700 transition">
        💰 Gerenciamento de vendas
      </div>

      <div className="bg-zinc-800 p-3 rounded-lg hover:bg-zinc-700 transition">
        📊 Relatórios e análises
      </div>

      <div className="bg-zinc-800 p-3 rounded-lg hover:bg-zinc-700 transition">
        🔒 Controle de usuários
      </div>

    </div>
  </div>

  {/* Rodapé */}
  <div className="mt-8 pt-4 border-t border-zinc-700 text-center">
    <p className="text-xs text-gray-500">
      © {new Date().getFullYear()} {pkg.name}
    </p>

    <p className="text-xs text-gray-600 mt-1">
      Todos os direitos reservados.
    </p>
  </div>

</div>
  );
}