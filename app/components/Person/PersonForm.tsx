"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cadastroSchema } from "../../lib/schema"
import { buscarCNPJ } from "../../lib/receita"
import { z } from "zod"
import { TPerson, Gender, TypePerson, TGroupPerson } from "@/app/models/TPerson"
import { TZipCode } from "@/app/models/TAddress"
import { PersonList } from "./PersonList"
import ShowForm from "../ShowForm"

type FormData = z.infer<typeof cadastroSchema>

type Props = {
  children: TPerson
  zipcodes: TZipCode[]
  handleChange: any
  handleSubmit_: Function | any
  msg: string
  setChildren: React.Dispatch<React.SetStateAction<TPerson | any>>
  groupPersons: TGroupPerson[]
  persons: TPerson[]
}

export default function PersonForm({
  children,
  zipcodes,
  handleChange,
  handleSubmit_,
  msg,
  setChildren,
  groupPersons,
  persons }: Props) {

  const [showForm, setShowForm] = useState(false)
  const [step, setStep] = useState(1)

  const genders = [
    { gender: Gender.MASCULINO, name: 'Masculino' },
    { gender: Gender.FEMININO, name: 'Feminino' },
    { gender: Gender.OUTRO, name: 'Outro' }
  ]

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: {
      tipoPessoa: "pf"
    }
  })

  const tipoPessoa = watch("tipoPessoa")
  const cnpjValue = watch("cnpj")

  async function handleBuscarCNPJ() {
    if (!cnpjValue) return

    const data = await buscarCNPJ(cnpjValue)

    setValue("razaoSocial", data.razao_social)
    setValue("nomeFantasia", data.nome_fantasia)
  }

  function onSubmit(data: FormData) {
    console.log("Dados finais:", data)
    // alert("Cadastro realizado com sucesso 🚀")
  }

  function formatCPF(value: string | undefined | null) {
    if (!value) return ""
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
  }

  function formatCNPJ(value: string | undefined | null) {
    if (!value) return ""
    return value
      .replace(/\D/g, "") // remove tudo que não é número
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 18) // limita tamanho final
  }

  function formatPhone(value: string | undefined | null) {
    if (!value) return "";
    value = String(value).replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    if (value.length > 10) {
      value = value.replace(/(\d{5})(\d)/, "$1-$2");
    } else {
      value = value.replace(/(\d{4})(\d)/, "$1-$2");
    }
    return value;
  }

  const dateOfBirt = (children: TPerson, handleChange: any) => {
    return <> <label>{tipoPessoa === 'pf' ?
      'Data de Nascimento' : 'Data de Abertura'}</label>
      <input
        {...register}
        type='date'
        name="dateOfBirth"
        value={children.dateOfBirth as any}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg"
      /></>
  }

  return <>
    <ShowForm
      showForm={showForm}
      setShowForm={setShowForm}
    />
    {showForm && <div id="up-person" className="max-w-3xl mx-auto bg-gray-600 p-8 rounded-2xl shadow-lg">
      {/* STEP INDICATOR */}
      <div className="flex justify-between mb-8">
        {["Tipo", "Dados", "Contato", "Endereço"].map((item, index) => (
          <div key={index}
            className={`flex-1 text-center font-semibold 
${step === index + 1 ? "text-blue-600" : "text-gray-400"}`}>
            {item}
          </div>
        ))}
      </div>
      {children.id != 0 ? <> <b>Atualizar Registro</b>
        <div>{"ID:" + String(children.id).padStart(9, '0') + " - " + children.name} </div> </> :
        <p className=" font-bold">Novo Registro</p>}
      {step === 1 && <>  <label>Grupo da Pessoa</label>
        <select className="w-full p-3 border mb-8 bg-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          value={children.groupPerson.id || ''}
          name="id"
          onChange={(e) => setChildren({
            ...children, groupPerson: {
              id: parseInt(e.target.value),
              name: ''
            }
          })} >
          <option disabled value=''>Selecione o Grupo de Pessoas ...</option>
          {groupPersons.map((groupPerson) => (<option
            key={groupPerson.id} value={groupPerson.id}>{groupPerson.name}</option>))}
        </select> </>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* STEP 1 */}
        {step === 1 && (
          <div className="flex gap-4">

            <button
              type="button"
              onClick={() => {
                setValue("tipoPessoa", "pf")
                setChildren({
                  ...children,
                  typePerson: TypePerson.FISICA
                })
              }}
              className={`flex-1 p-3 rounded-lg border 
${tipoPessoa === "pf" ? "bg-blue-600 text-white" : ""}`}
            >
              Pessoa Física
            </button>
            <button
              type="button"
              onClick={() => {
                setValue("tipoPessoa", "pj")
                setChildren({
                  ...children,
                  typePerson: TypePerson.JURIDICA
                })
              }}
              className={`flex-1 p-3 rounded-lg border 
${tipoPessoa === "pj" ? "bg-blue-600 text-white" : ""}`}
            >
              Pessoa Jurídica
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && tipoPessoa === "pf" && (
          <>
            <input {...register("nome")}
              name="name"
              value={children.name}
              onChange={handleChange}
              placeholder="Nome Completo"
              className="w-full p-3 border rounded-lg" />

            <input {...register("cpf")}
              type="text"
              name="cpf"
              value={formatCPF(children.cpf || '')}
              placeholder="Digite seu CPF"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              maxLength={14}
            />
            {errors.cpf && <p className="text-red-500">{errors.cpf.message}</p>}

            <input
              type="text"
              name="rg"
              defaultValue={children.rg || ''}
              placeholder="Digite seu RG"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              maxLength={14}
            />

            {dateOfBirt(children, handleChange)}

            <label>Gênero: {children.gender}</label>
            <select className="w-full p-3 border bg-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={children.gender || ''}
              name="gender"
              onChange={(e) => setChildren({
                ...children, gender: parseInt(e.target.value)
              })}
            >
              <option disabled value=''>Selecione o seu gênero ...</option>
              {genders.map((gender) => (
                <option key={gender.gender} value={gender.gender}>{gender.name}</option>
              ))}
            </select>
          </>
        )}

        {step === 2 && tipoPessoa === "pj" && (
          <>
            <input
              {...register("cnpj")}
              name='cnpj'
              value={formatCNPJ(children.cnpj || "")}
              onChange={handleChange}
              placeholder="00.000.000/0000-00"
              className="w-full p-3 border rounded-lg"
              maxLength={18}
            />

            <button
              type="button"
              onClick={handleBuscarCNPJ}
              className="bg-gray-200 p-2 rounded-lg">
              Buscar CNPJ
            </button>

            {children.name && <div>{`Razão Social : ${children.name}`}  </div>}
            <input {...register("razaoSocial")}
              type="text"
              name="name"
              value={children.name || ""}
              onChange={handleChange}
              placeholder="Razão Social"
              className="w-full p-3 border rounded-lg" />

            <input {...register("nomeFantasia")}
              type="text"
              hidden
              placeholder="Nome Fantasia"
              className="w-full p-3 border rounded-lg" />
            {errors.cnpj && <p className="text-red-500">{errors.cnpj.message}</p>}

            <input
              type="text"
              name="inscricState"
              value={children.inscricState || ""}
              onChange={handleChange}
              placeholder="Inscrição Estadual"
              className="w-full p-3 border rounded-b-lg" />

            {dateOfBirt(children, handleChange)}
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <input {...register("email")}
              type="email"
              name='email'
              value={children.email || ""}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border rounded-lg" />

            <input
              {...register("phone")}
              type="text"
              name="phone"
              value={formatPhone(children.phone || "")}
              onChange={handleChange}
              placeholder="Telefone"
              maxLength={15}
              className="w-full p-3 border rounded-lg"
            />
            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
          </>
        )}

        {step === 4 && <>
          {children.id != 0 && <input
            type="hidden"
            name="id"
            value={children.address.id}
            onChange={(e) =>
              setChildren({
                ...children,
                address: {
                  ...children.address,
                  id: parseInt(e.target.value)
                }
              })
            }
            placeholder="Endereço"
            className="w-full p-3 border rounded-lg"
          />}
          <input
            type="text"
            name="street"
            value={children.address.street}
            onChange={(e) =>
              setChildren({
                ...children,
                address: {
                  ...children.address,
                  street: e.target.value
                }
              })
            }
            placeholder="Endereço"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            name="number"
            value={children.address.number}
            onChange={(e) =>
              setChildren({
                ...children,
                address: {
                  ...children.address,
                  number: e.target.value
                }
              })
            }
            placeholder="Número"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            name="neighborhood"
            value={children.address.neighborhood}
            onChange={(e) =>
              setChildren({
                ...children,
                address: {
                  ...children.address,
                  neighborhood: e.target.value
                }
              })
            }
            placeholder="Bairro"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            name="complement"
            value={children.address.complement}
            onChange={(e) =>
              setChildren({
                ...children,
                address: {
                  ...children.address,
                  complement: e.target.value
                }
              })
            }
            placeholder="Complemento"
            className="w-full p-3 border rounded-lg"
          />
          <label>Cep de sua cidade</label>
          <select
            className="w-full p-3 border bg-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={children.address.zipCode?.id || ""}
            name="id"
            onChange={(e) =>
              setChildren({
                ...children,
                address: {
                  ...children.address,
                  zipCode: {
                    id: parseInt(e.target.value)
                  }
                }
              })
            }
          >
            <option disabled value="">
              Selecione o Cep de sua Cidade ...
            </option>
            {zipcodes.map((zipcode) => (
              <option key={zipcode.id}
                value={zipcode.id}>{zipcode.code}</option>
            ))}
          </select>
        </>}

        {/* BOTÕES */}
        <div className="flex justify-between">
          {step > 1 && (
            <button type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 border rounded-lg">
              Voltar
            </button>
          )}
          {step < 4 ? (
            <button type="button"
              onClick={() => setStep(step + 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Próximo
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit_}
              className="px-4 py-2 bg-green-600 text-white rounded-lg">
              {children.id === 0 ? "Finalizar" : "Atualizar"}
            </button>
          )}
        </div>
        <p className="text-gray-300 ">{msg && msg}</p>
      </form>
    </div>}
    <PersonList
      persons={persons}
      setChildren={setChildren}
      setShowForm={setShowForm}
    />
  </>
}