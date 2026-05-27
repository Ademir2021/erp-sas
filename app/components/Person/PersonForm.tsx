"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { cadastroSchema } from "../../lib/schema"
import { buscarCNPJ } from "../../lib/receita"
import { z } from "zod"
import { TPerson, Gender, TypePerson, TGroupPerson } from "@/app/models/TPerson"
import { TZipCode } from "@/app/models/TAddress"
import { PersonList } from "./PersonList"
import ShowForm from "../ShowForm"
import { globalStyles_form, globalStyles_select } from "../GlobalStyles"

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import PlaceIcon from '@mui/icons-material/Place';
import DoneIcon from '@mui/icons-material/Done';
import CheckIcon from '@mui/icons-material/Check';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import RestoreIcon from '@mui/icons-material/Restore';
import LegalNoticeLGPD from "./LegalNoticeLGPD"

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
  url_plano: any
}

export default function PersonForm({
  children,
  zipcodes,
  handleChange,
  handleSubmit_,
  msg,
  setChildren,
  groupPersons,
  persons,
  url_plano }: Props) {

  const [cityInput, setCityInput] = useState("");

  const [showForm, setShowForm] = useState(false)
  const [step, setStep] = useState(1)

  const router = useRouter()

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

  const formatCEP = (value: any) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2-$3")
      .slice(0, 10);
  };

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

  const steps = [
    { label: <OpenInNewIcon fontSize="large" titleAccess="Tipo de Pessoa" />, step: 1 },
    { label: <PersonAddAlt1Icon fontSize="large" titleAccess="Dados da Pessoa" />, step: 2 },
    { label: <AddIcCallIcon fontSize="large" titleAccess="Dados de Contatos" />, step: 3 },
    { label: <PlaceIcon fontSize="large" titleAccess="Dados de Localidade" />, step: 4 },
  ];

  return <>
    {persons.length !== 0 && <ShowForm
      showForm={showForm}
      setShowForm={setShowForm}
      />}
    {(showForm || persons.length === 0) && <div id="up-person" className={`${globalStyles_form} max-w-xl mx-auto`}>
      {/* STEP INDICATOR */}


      <div className="flex justify-between mb-1">
        {steps.map((item) => (
          <button
          key={item.step}
          onClick={() => setStep(item.step)}
          className={`cursor-pointer transition-colors
            ${step === item.step
              ? "text-blue-600"
              : "text-gray-400 hover:text-gray-600"
            }`}
            >
            {item.label}
          </button>
        ))}
        <LegalNoticeLGPD />
      </div>
      {children.id != 0 ? <> <b>Atualizar Registro</b>
        <div>{"ID:" + String(children.id).padStart(9, '0') + " - " + children.name} </div> </> :
        <p className=" font-bold">Novo Registro</p>}
      {step === 1 && <>  <label>Grupo da Pessoa</label>
        <select className={`${globalStyles_select} mb-3`}
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
              className={`flex-1 p-3 rounded-lg border cursor-pointer
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
              className={`flex-1 p-3 rounded-lg border cursor-pointer
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
            <select className={globalStyles_select}
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
              className="bg-gray-700 cursor-pointer p-2 rounded-lg">
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
          <label>
            Cidade/Cep,{" "}
            {children.address.zipCode && (
              <span className="text-gray-300">
                {`${children.address.zipCode?.city?.name || ''} - 
CEP ${formatCEP(children.address.zipCode?.code) || '?'}`}
              </span>
            )}
          </label>
          <input
            list="cities"
            className={globalStyles_select}
            value={cityInput}
            placeholder="Digite a cidade..."
            onChange={(e) => {
              const value = e.target.value;
              setCityInput(value);
              const selected = zipcodes.find(
                z => z.city?.name?.toLowerCase() === value.toLowerCase()
              );
              if (selected) {
                setChildren({
                  ...children,
                  address: {
                    ...children.address,
                    zipCode: selected as TZipCode
                  }
                });
              }
            }}
          />
          <datalist id="cities">
            {zipcodes.map((zipcode) => (
              <option
                key={zipcode.id}
                value={zipcode.city?.name}
              >{`${zipcode.city?.name} - 
${zipcode.city?.state?.acronym} - 
${zipcode?.code}`}</option>
            ))}
          </datalist>
        </>}

        {/* BOTÕES */}
        <div className="flex justify-between">
          {step > 1 && (<>
            <button type="button"
              onClick={() => setStep(step - 1)}
              className="px-2 py-2 cursor-pointer bg-blue-600 text-white rounded-lg">
              <ArrowBackIosIcon titleAccess="Voltar" />
            </button>
            <button type="button"
              onClick={() => setStep(1)}
              className="px-2 py-2 cursor-pointer bg-blue-600 text-white rounded-lg">
              <RestoreIcon titleAccess="Inicio" />
            </button>
          </>)}
          {step < 4 ? (
            <button type="button"
              onClick={() => setStep(step + 1)}
              className="px-2 py-2 cursor-pointer bg-blue-600 text-white rounded-lg">
              <ArrowForwardIosIcon titleAccess="Próximo" />
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit_}
              className="px-4 cursor-pointer py-2 bg-green-600 text-white rounded-lg">
              {children.id === 0 ? <DoneIcon titleAccess="Finalizar" /> : <CheckIcon titleAccess="Concluir" />}
            </button>
          )}
        </div>
        <p className="text-gray-300 ">{msg && msg}</p>
      </form>
      {url_plano !== "person" && <button
        className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg"
        onClick={() => router.push(url_plano)}
      >Retornar ao Plano</button>}
    </div>}
    {persons.length > 0 && <PersonList
      persons={persons}
      setChildren={setChildren}
      setShowForm={setShowForm}
    />}
  </>
}