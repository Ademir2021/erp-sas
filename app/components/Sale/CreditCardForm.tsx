import { TCreditCart } from "@/app/models/TSale"

type Props = {
    creditCard: TCreditCart
    setCreditCard: Function
    handleSubmitCreditCard: any
}

export default function CreditCardForm({
    creditCard, setCreditCard, handleSubmitCreditCard
}: Props) {

    const styles_input = "w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

    return <>
        <form
            onSubmit={handleSubmitCreditCard}
            className="mt-2 max-w-md mx-auto bg-gray-500 p-6 rounded-2xl shadow-md space-y-4"
        >
            <h2 className="text-xl font-semibold text-gray-700">Cartão de Crédito</h2>
            <input
                type="text"
                placeholder="Nome no cartão"
                onChange={(e) =>
                    setCreditCard({ ...creditCard, holder: e.target.value })
                }
                required
                className={`${styles_input}`}
            />
            <input
                type="text"
                placeholder="Nº do cartão"
                onChange={(e) =>
                    setCreditCard({ ...creditCard, number: e.target.value })
                }
                maxLength={20}
                required
                className={`${styles_input}`}
            />
            <div className="grid grid-cols-3 gap-3 items-center">
                <input
                    type="text"
                    placeholder="MM"
                    onChange={(e) =>
                        setCreditCard({ ...creditCard, ex_month: e.target.value })
                    }
                    maxLength={2}
                    required
                    className={`${styles_input} border`}
                />
                <input
                    type="text"
                    name="ex_year"
                    placeholder="AAAA"
                    onChange={(e) =>
                        setCreditCard({ ...creditCard, ex_year: e.target.value })
                    }
                    maxLength={4}
                    required
                    className={`${styles_input} border`}
                />
                <input
                    type="text"
                    placeholder="CVV"
                    onChange={(e) =>
                        setCreditCard({ ...creditCard, secure_code: e.target.value })
                    }
                    maxLength={3}
                    required
                    className={`${styles_input} border`}
                />
            </div>
            <input type="hidden" name="encrypted" disabled />
            <button type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >Pagar</button>
        </form>
    </>
}