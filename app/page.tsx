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
            Mais segurança, mais eficiência e mais produtividade para o seu negócio. Conheça nossas soluções e serviços personalizados para atender às suas necessidades específicas.
          </p>
        </div>
        {/* Cards 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {/* Cards 1 */}
            {cards_1(
              "Controle das Vendas de Items ou Serviços, Pedidos e Orçamentos",
              "Sistema WEB SAS para controle de vendas, pedidos e orçamentos, com gestão de clientes, produtos, estoque, relatórios e análises para otimizar o desempenho do seu negócio.",
              "Saiba Mais")}
            {cards_2(
              "Checkout para Pagamentos com PIX/Cartão/Crédito Loja",
              "Sistema WEB SAS com checkout para pagamentos com PIX, crédito Loja e cartão de crédito, garantindo segurança e conveniência para seus clientes.",
              "Saiba Mais")}
          <br />
          {/**Cards 2 */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {cards_1(
            "Gestão Integrada no Cadastro de Clientes",
            "Sistema WEB SAS para gestão integrada do cadastro de clientes, com funcionalidades de atualização, consulta e análise de dados para melhorar o atendimento e a satisfação do cliente.",
            "Saiba Mais")}
          {cards_2(
            "Controle de Acesso e Segurança para sua Empresa",
            "Gestão de controle de acesso e segurança para sua empresa, garantindo a proteção dos dados e a integridade dos sistemas.",
            "Saiba Mais")}
        </div>
        <p className="text-gray-300 mt-4 text-lg">Comece agora mesmo</p>
      </main>
    </div>
  </>
}