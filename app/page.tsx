import { getServerSession } from "next-auth"
import MenuHeader from "./components/MenuHeader"
import Sidebar from "./components/Sidebar"

export default async function RootLayout() {

  const session: any = await getServerSession()

  function cards_1(card: string, description: string, button: string) {
    return <div className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
      <h2 className="text-xl font-semibold mb-3">{card}</h2>
      <p className="text-gray-400">
        {description}
      </p>
      <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
        {button}
      </button>
    </div>
  };
  function cards_2(card: string, description: string, button: string) {
    return <div className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
      <h2 className="text-xl font-semibold mb-3">{card}</h2>
      <p className="text-gray-400">
        {description}
      </p>
      <button className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">
        {button}
      </button>
    </div>
  }

  return <>
    <MenuHeader session={session} />
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="min-h-screen flex flex-col w-326 items-center justify-center bg-gray-800 text-white px-4 py-10">
        {/* Título */}
        <div className="text-center mb-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Soluções e Segurança para sua ( Empresa ou Negôcio ).
          </h1>
          <p className="text-gray-300 text-lg">
            Soluções apropriadas para o seu negócio
          </p>
        </div>
        {/* Cards 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {/* Cards 1 */}
            {cards_1(
              "Sistema ERP para Gestão Empresarial",
              "Controle das Vendas e estoque, Fluxos de caixa e Contas a pagar e receber. | R$360.00",
              "Saiba Mais")}
            {cards_2(
              "Sistema para Automação de vendas On-line",
              "Sistema WEB SAS com cards dos produtos á venda, carrinho de compras, ChecKout para pagamentos com PIX/Cartão, Gestão de Acompanameto e de entregas dos Produtos com segurança.",
              "Saiba Mais")}
          <br />
          {/**Cards 2 */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {cards_1(
            "Redes de Fibra Optica",
            "Projetos e Execução de redes com Fibra Òptica para Residências. Industria e na Agro-Pecuária.",
            "Saiba Mais")}
          {cards_2(
            "Redes Ponto a Ponto via Rádio para longas distâncias 5.8Ghz",
            "Projeto e execução de rede PPP com Rádios 5.8Ghz inteligando escritórios á pontos distantes e de difícil acesso, com velociadades superiores á 300Mbps.",
            "Saiba Mais")}
        </div>
        <p className="text-gray-300 mt-4 text-lg">Comece agora mesmo</p>
      </main>
    </div>
  </>
}