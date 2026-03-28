


export default function CreditCardForm() {

return <>
<form
onSubmit={null as any}
className="mt-2 max-w-md mx-auto bg-gray-500 p-6 rounded-2xl shadow-md space-y-4"
>
<h2 className="text-xl font-semibold text-gray-700">
Cartão de Crédito
</h2>

<input type="hidden" name="public_key" disabled />

<input
type="text"
name="holder"
placeholder="Nome no cartão"
required
className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

<input
type="text"
name="number"
placeholder="Nº do cartão"
maxLength={20}
required
className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

<div className="grid grid-cols-3 gap-3 items-center">
<input
type="text"
name="ex_month"
placeholder="MM"
maxLength={2}
required
className="border border-gray-300 rounded-lg p-3 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

<input
type="text"
name="ex_year"
placeholder="AAAA"
maxLength={4}
required
className="border border-gray-300 rounded-lg p-3 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

<input
type="text"
name="secure_code"
placeholder="CVV"
maxLength={3}
required
className="border border-gray-300 rounded-lg p-3 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
</div>

<input type="hidden" name="encrypted" disabled />

<button
type="submit"
className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
>
Pagar
</button>
</form>
</>
}