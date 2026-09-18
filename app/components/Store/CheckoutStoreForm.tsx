import { useParams, useRouter } from "next/navigation";

export default function CheckoutStorePage() {
    const router = useRouter();
    return (
        <>
        <main>
        <p>Checkout Store</p>
        <button
        onClick={() => router.back()}>Voltar a lista</button>
        </main>

           <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
            <div className="bg-black p-8 rounded-2xl shadow-lg w-full max-w-md"></div>
            </main>
        
        </>
    )
}