import { TPerson } from "@/app/models/TPerson"
import { globalStyles_overflow, globalStyles_table_list, globalStyles_td, globalStyles_th } from "../GlobalStyles"

type Props = {
  persons: TPerson[]
  setChildren: Function
   setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}

export function PersonList({ persons, setChildren, setShowForm }: Props) {

  function updatePerson(person: TPerson) {
    
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
    setShowForm(true)
  }

  return <>
    <div className={globalStyles_overflow} >
    <table className={globalStyles_table_list}>
      <thead className="bg-gray-500">
        <tr>
          <th className={`${globalStyles_th} text-center`}>ID</th>
          <th className={`${globalStyles_th} text-left`}>Nome</th>
          <th className={`${globalStyles_th} text-left`}>CPF/CNPJ</th>
          <th className={`${globalStyles_th} text-left`}>RG/INCRIC</th>
          <th className={`${globalStyles_th} text-left`}>Telefone</th>
          <th className={`${globalStyles_th} text-left`}>Email</th>
          <th className={`${globalStyles_th} text-center`}>Ações</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {persons.map((person: TPerson) => (
          <tr key={person.id} className="hover:bg-gray-600 transition text-sky-100 ">
            <td className={`${globalStyles_td} text-center`}>{person.id}</td>
            <td className={`${globalStyles_td} text-left`}>{person.name}</td>
            <td className={`${globalStyles_td} text-left`}>{person.cpf ? person.cpf : person.cnpj}</td>
            <td className={`${globalStyles_td} text-left`}>{person.rg ? person.rg : person.inscricState}</td>
            <td className={`${globalStyles_td} text-left`}>{person.phone ? person.phone : "Não informado"}</td>
            <td className={`${globalStyles_td} text-left`}>{person.email ? person.email : "Não informado"}</td>
            <td className={`${globalStyles_td} text-center`}><a href="#up-person"
                onClick={() => updatePerson(person)}
                className="px-2 py-1 text-[12px] font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
              >Atualizar</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  </>
}