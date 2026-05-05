import { useParams, useRouter } from "next/navigation";

import { TPlano } from "@/app/models/TPlanos"

type Props = {
    plano: TPlano
    handlePagamento: () => void
}

export default function PlanosChecKoutForm({
    plano, handlePagamento }: Props) {
    const router = useRouter()

    return (
        <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
            <div className="bg-black p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-2">{plano.nome}</h1>
                <p className="text-gray-400 mb-6">{plano.descricao}</p>
                <div className="text-4xl font-bold text-blue-500 mb-6">
                    R$ {plano.preco.toFixed(2)}
                    <span className="text-sm text-gray-400">/mês</span>
                </div>
                <div className="space-y-3 text-gray-300 text-sm mb-6">
                    <p>✔ Acesso completo ao sistema</p>
                    <p>✔ Suporte via chat</p>
                    <p>✔ Cancelamento a qualquer momento</p>
                </div>
                <button
                    onClick={handlePagamento}
                    className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold"
                >Finalizar Plano</button>
                <button onClick={() => router.push('/solutions')}
                    className="w-full mt-3 text-gray-400 hover:text-white text-sm"
                >Voltar</button>
            </div>
        </main>
    )
}