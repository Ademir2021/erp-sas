import { useRouter } from "next/navigation";
import { TItem, TResponseImages } from "@/app/models/TItem";
import { useState } from "react";

type Props = {
    item: TItem
    responseImages: TResponseImages[]
}

export default function CheckoutStorePage({ item, responseImages }: Props) {

    const [amount, setAmount] = useState(1);
    const router = useRouter();
    function buyNow() { alert("Comprar agora") }
    function addToCart() { alert("Adicionar ao carrinho") }

    const itemImages = responseImages.filter(
        (img) => img.idItem === item.id
    );

    const [imageSelected, setImageSelected] = useState("")

    return (
        <>
            <div className="w-full max-w-6xl mx-auto px-4 py-4">
                <nav aria-label="Navegação" className="flex items-center gap-2 text-sm text-gray-600">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className=" text-blue-500 hover:text-blue-800
transition cursor-pointer">
                        Voltar</button>
                    <span className="text-gray-400">›</span>
                    <span className="text-blue-400">
                        {item.subGroup.group.name}</span>
                    <span className="text-gray-400">›</span>
                    <span className="text-blue-400">
                        {item.subGroup.name}</span>
                </nav>
            </div>
            <main className="min-h-screen bg-gray-300 text-gray-900 py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Título */}
                    <h1 className="text-2xl font-semibold mb-6">
                        Finalizar compra - Barras: {item.barCode}
                    </h1>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* PRODUTO */}
                        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                            {/*  IMAGES ITEMS */}
                            <div className="flex flex-col md:flex-row gap-8">
                                {/* IMAGEM */}
                                <div className="w-full md:w-1/2 flex items-center justify-center">
                                    <div className="grid-cols-1 lg:grid-cols-3 gap-6" >
                                        {itemImages.length > 0 ?
                                            itemImages.map((img) => (
                                                <button className="cursor-pointer"
                                                    key={img.id}
                                                    type="button"
                                                    onMouseEnter={() => setImageSelected(img.fileName)}
                                                >
                                                    <img
                                                        src={`${process.env.NEXT_PUBLIC_API_IMG}/${img.idItem}/${img.fileName}`}
                                                        alt={item.name}
                                                        className="w-16 h-16 mb-1 object-contain mx-auto rounded border"
                                                      
                                                    /></button>
                                            )) : <span>Sem images</span>}
                                    </div>
                                    {itemImages.length > 0 ? <img
                                        src={`${process.env.NEXT_PUBLIC_API_IMG}/${item.id}/${imageSelected || itemImages[0].fileName}`}
                                        alt={item.imagem}
                                        className="w-75  max-w-md h-75 object-contain" /> : <p>Sem Imagem</p>}
                                </div>
                                {/* INFORMAÇÕES */}
                                <div className="flex-1">
                                    <h2 className="text-xl font-medium mb-4">
                                        {item.name}
                                    </h2>
                                    <div className="border-b pb-5">
                                        <span className="text-sm text-gray-500">Preço</span>
                                        <div className="text-3xl font-semibold mt-1">
                                            R$ {item.priceMax.toFixed(2)}
                                        </div>
                                        <p className="text-sm text-green-600 mt-2">
                                            Em até 12x sem juros</p>
                                    </div>
                                    {/* QUANTIDADE */}
                                    <div className="mt-5">
                                        <label className="text-sm font-medium">
                                            Quantidade
                                        </label>
                                        <div className="flex items-center mt-2">
                                            <button
                                                className="w-10 h-10 border rounded-l-md hover:bg-gray-100 cursor-pointer"
                                                onClick={() => setAmount(Math.max(1, amount - 1))}>-</button>
                                            <div className="w-12 h-10 border-t border-b flex items-center justify-center">{amount}</div>
                                            <button
                                                className="w-10 h-10 border rounded-r-md hover:bg-gray-100 cursor-pointer"
                                                onClick={() => setAmount(amount + 1)}>+
                                            </button>
                                        </div>
                                    </div>
                                    {/* ENTREGA */}
                                    <div className="mt-6">
                                        <p className="font-medium">🚚 Entrega</p>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Consulte o prazo e o valor do frete
                                        </p>
                                        <button className="text-blue-600 text-sm mt-2">
                                            Informar CEP
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* RESUMO DA COMPRA */}
                        <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
                            <h2 className="text-lg font-semibold mb-5">
                                Resumo da compra
                            </h2>
                            <div className="flex justify-between text-sm mb-3">
                                <span>Produto</span>
                                <span>R$ {item.priceMax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm mb-4">
                                <span>Frete</span>
                                <span className="text-green-600">Grátis</span>
                            </div>
                            <div className="border-t pt-4 flex justify-between">
                                <span className="font-semibold">Total</span>
                                <span className="text-2xl font-semibold">
                                    R$ {(item.priceMax * amount).toFixed(2)}
                                </span>
                            </div>
                            {/* BOTÃO COMPRAR */}
                            <button
                                className="
cursor-pointer
w-full
mt-6
bg-blue-600
hover:bg-blue-700
text-white
font-semibold
py-3
rounded-md
transition"
                                onClick={() => buyNow()}
                            >Comprar agora</button>
                            {/* CARRINHO */}
                            <button
                                className="
w-full
mt-3
bg-blue-100
hover:bg-blue-200
text-blue-700
font-semibold
py-3
rounded-md
transition"
                                onClick={() => addToCart()}>
                                Adicionar ao carrinho
                            </button>
                            {/* SEGURANÇA */}
                            <div className="mt-6 text-sm text-gray-500">
                                <p className="mb-2">🔒 Compra segura</p>
                                <p>Seus dados estão protegidos.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}