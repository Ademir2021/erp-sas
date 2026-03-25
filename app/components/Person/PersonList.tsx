import { TPerson } from "@/app/models/TPerson"

type Props = {
  persons: TPerson[]
  setChildren: Function
  setStep: Function
}

export function PersonList({ persons, setChildren, setStep }: Props) {

  function updatePerson(person: TPerson) {
    // setStep(2)
    const {
      address: {
        zipCode: { city, ...zipCodeSemCity },
        ...addressRest
      },
      ...rest
    } = person as any

    const newPerson = {
      ...rest,
      address: {
        ...addressRest,
        zipCode: zipCodeSemCity
      }
    }
    setChildren(newPerson)
  }

  return <>
    <br />
    <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">ID</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Nome</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">CPF/CNPJ</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">RG/INCRIC</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Telefone</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Email</th>
          <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Ações</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200">
        {persons.map((person: TPerson) => (
          <tr key={person.id} className="hover:bg-gray-600 transition text-sky-100 ">
            <td className="px-4 py-2 text-center">{person.id}</td>
            <td className="px-4 py-2 text-left">{person.name}</td>
            <td className="px-4 py-2 text-left">
              {person.cpf ? person.cpf : person.cnpj}
            </td>
            <td className="px-4 py-2 text-left">
              {person.rg ? person.rg : person.inscricState}
            </td>
            <td className="px-4 py-2">
              {person.phone ? person.phone : "Não informado"}
            </td>
            <td className="px-4 py-2">
              {person.email ? person.email : "Não informado"}
            </td>
            <td className="px-4 py-2 text-center">
              <a href="#up-person"
                onClick={() => updatePerson(person)}
                className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
              >Atualizar</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
}