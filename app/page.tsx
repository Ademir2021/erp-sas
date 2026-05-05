import Link from "next/link";

type CardProps = {
  title: string;
  description: string;
  buttonText: string;
  variant?: "dark" | "light";
};

function Card({ title, description, buttonText, variant = "dark" }: CardProps) {
  const styles =
    variant === "dark"
      ? "bg-black"
      : "bg-gray-900";

  const buttonStyles =
    variant === "dark"
      ? "bg-blue-600 hover:bg-blue-700"
      : "bg-green-600 hover:bg-green-700";

  return (
    <div className={`${styles} p-6 rounded-2xl shadow-lg hover:scale-105 transition`}>
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <p className="text-gray-400">{description}</p>

      <Link
        href="/solutions"
        className={`inline-block mt-4 px-4 py-2 rounded-lg text-white ${buttonStyles}`}
      >
        {buttonText}
      </Link>
    </div>
  );
}

const cardsData = [
  {
    title: "Controle das Vendas de Items ou Serviços, Pedidos e Orçamentos",
    description:
      "Controle de vendas, pedidos e orçamentos, com gestão de clientes, produtos, estoque, relatórios e análises para otimizar o desempenho do seu negócio.",
    buttonText: "Saiba Mais",
    variant: "dark",
  },
  {
    title: "Checkout para Pagamentos com PIX/Cartão/Crédito Loja",
    description:
      "Checkout para pagamentos com PIX, crédito Loja e cartão de crédito, garantindo segurança e conveniência para seus clientes.",
    buttonText: "Saiba Mais",
    variant: "light",
  },
  {
    title: "Gestão Integrada no Cadastro de Clientes",
    description:
      "Gestão integrada do cadastro de clientes, com funcionalidades de atualização, consulta e análise de dados para melhorar o atendimento e a satisfação do cliente.",
    buttonText: "Saiba Mais",
    variant: "dark",
  },
  {
    title: "Controle de Acesso e Segurança para sua Empresa",
    description:
      "Gestão de controle de acesso e segurança para sua empresa, garantindo a proteção dos dados e a integridade dos sistemas.",
    buttonText: "Saiba Mais",
    variant: "light",
  },
];

export default function RootLayout() {
  return (
    <div className="flex text-white">
      <main
        className="min-h-screen flex flex-col max-w-7xl w-full mx-auto items-center justify-center px-4 py-10 bg-cover bg-center mt-12"
        style={{ backgroundImage: "url('/bg/bg-home.jpg')" }}
      >
        {/* Header */}
        <div className="text-center text-black/90 mb-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Soluções e segurança para sua Empresa ou Negócio.
          </h1>
          <p className="text-black/90 text-lg">
            Mais segurança, mais eficiência e mais produtividade para o seu negócio.
            Conheça nossas soluções e serviços personalizados.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {cardsData.map((card, index) => (
            <Card key={index} {...card as CardProps} />
          ))}
        </div>

        <Link href="/login" className="mt-6 text-white/80 text-2xl font-bold">
          Comece agora mesmo!
        </Link>
      </main>
    </div>
  );
}