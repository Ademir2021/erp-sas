import { TPlano } from "@/app/models/TPlanos"
import { TCreditCart } from "@/app/models/TSale"

type Props = {
    creditCard: TCreditCart
    setCreditCard: Function
    handleSubmitCreditCard: any
    msgCreditCard: string
    plano?: TPlano
}

export default function CreditCardForm({
    creditCard,
    setCreditCard,
    handleSubmitCreditCard,
    msgCreditCard,
    plano
}: Props) {

    const styles_input = "w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

    const increaseInstallments = () => {
        setCreditCard((prev: TCreditCart) => ({
            ...prev,
            // installments: prev.installments + 1,
            installments: prev.installments < 6 ? prev.installments + 1 : 6,
        }));
    };

    const decreaseInstallments = () => {
        setCreditCard((prev: TCreditCart) => ({
            ...prev,
            installments: prev.installments > 1 ? prev.installments - 1 : 1,
        }));
    };

    function removePlano(){
    localStorage.removeItem("url_plano");
    localStorage.removeItem("person");
      setTimeout(() => {
                window.location.assign('/solutions');
            }, 3000)
    }

    return <>
        <form
            onSubmit={handleSubmitCreditCard}
            className="mt-2 max-w-md mx-auto bg-black/80 p-6 rounded-2xl shadow-md space-y-4"
        >
            <h2 className="text-xl font-semibold text-gray-300">Cartão de Crédito</h2>
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
            {/**Parcelas */}
            <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                {!!!plano ? <><span className="text-gray-300 font-bold">{creditCard.installments === 1 ? "À vista" : "Parcelas"}</span>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={decreaseInstallments}
                            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                        >-</button>

                        {<span className=" text-white px-3 py-1 rounded">
                            {creditCard.installments === 1 ? creditCard.payment.toFixed(2) : `${creditCard.installments} x
                    ${((creditCard.payment / creditCard.installments).toFixed(2))}`}
                        </span>}

                        <button
                            type="button"
                            onClick={increaseInstallments}
                            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            +
                        </button>
                    </div></> : <><span> {`Valor do plano ... R$ ${(plano?.preco).toFixed(2)} `}</span>
                    <a href="##" type="button" onClick={()=>{removePlano()}}>Cancelar</a></>}
            </div>
            <button type="submit" 
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >Pagar</button>
            {msgCreditCard && <p className="text-red-600 text-center">{msgCreditCard}</p>}
        </form>
    </>
}