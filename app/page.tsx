import Link from "next/link";
import TerminalIcon from '@mui/icons-material/Terminal';

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
        className="min-h-screen flex flex-col max-w-7xl w-full
        mx-auto items-center justify-center px-4 py-10
        bg-cover bg-center mt-12"
        style={{ backgroundImage: "url('/bg/bg-home.jpg')" }}
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 px-4">
          <span
            className="
        inline-flex items-center gap-3
        mb-5 px-5 py-2.5
        rounded-full
        bg-white/80
        border border-zinc-200
        text-zinc-800 text-sm font-semibold
        shadow-xl
        backdrop-blur-md
    "
          >
            <span className="flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>

            Segurança • Tecnologia • Performance
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold
          leading-tight tracking-tight">
            <span className="text-zinc-900">
              Soluções inteligentes
            </span>{" "}

            <span className="text-blue-600">
              para proteger e impulsionar
            </span>{" "}

            <span className="text-zinc-900">
              seu negócio.
            </span>
          </h1>

          {/* Botões */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">

            <Link className="cursor-pointer px-6 py-3 rounded-2xl
            bg-black text-white font-semibold hover:scale-105
            transition duration-300 shadow-lg"
              href="/solutions"
            > Conhecer Soluções ? {<TerminalIcon titleAccess="Saiba mais ..." />}
            </Link>

            <a className="px-6 py-3 rounded-2xl border border-zinc-300
            bg-white text-zinc-800 font-semibold hover:bg-zinc-400 transition duration-300"
              href="https://wa.me/5544988521033?text=Olá,%20gostaria%20de%20falar%20com%20um%20especialista."
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar com Especialista ? : )
            </a>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {cardsData.map((card, index) => (
            <Card key={index} {...card as CardProps} />
          ))}
        </div>
        <a className="mt-3 bg-blue-800 hover:bg-blue-900
           text-white py-3 px-9 rounded-3xl cursor-pointer transition"
          href="/login">
          Comece agora mesmo ! ...
        </a>
      </main>
    </div>
  );
} 