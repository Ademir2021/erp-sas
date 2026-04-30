import { TGeneric } from "@/app/models/TGeneric";
import { globalStyles_form, globalStyles_select } from "../GlobalStyles";
import GenericList from "./GenericList";
import { Tgroup } from "@/app/models/TItem";
import { TCity, TCountry, TState } from "@/app/models/TAddress";
import ShowForm from "../ShowForm";
import { useState } from "react";

type Props = {
    children: TGeneric
    handleChange: any
    setGenericDefined: React.Dispatch<React.SetStateAction<string>>
    genericDefined: string
    setGeneric: React.Dispatch<React.SetStateAction<TGeneric>>
    generics: TGeneric[]
    handleSubmit: any
    msg: string
    groups: Tgroup[]
    countrys: TCountry[]
    states: TState[]
    citys: TCity[]
}

export default function GenericForm({
    children, handleChange, setGenericDefined,
    genericDefined, generics, setGeneric,
    handleSubmit, msg, groups, states, countrys, citys }: Props) {

    
      const [showForm, setShowForm] = useState(false)

    const genericMap: Record<string, string> = {
        brands: 'Marca',
        itemsclasses: 'Classe',
        typeitems: 'Tipo de ITem',
        unitmeasures: 'Unidade de Medida',
        subgroups: 'SubGrupo',
        groups: 'Grupo',
        countrys: 'País',
        states: 'Estado',
        citys: 'Cidade',
        zipcodes: 'CEP'
    }

    function loadGenericDefined() {
        return genericMap[genericDefined] || ''
    }

    return (<>
        <ShowForm
          showForm={showForm}
          setShowForm={setShowForm}
        />
         <div id="up-generic">
           {showForm && <div className={`${globalStyles_form} max-w-xl mx-auto`}>
                {children.id != 0 ? <> <b>Atualizar Registro</b>
                    <div>{"ID:" + String(children.id).padStart(9, '0') + " - "
                        + (children.name ? children.name : children.code)} </div> </> :
                    <p className="font-bold mb-3">Novo Registro</p>}
                <label >Selecionar o Tipo de Registro</label>
                <select className={`${globalStyles_select} cursor-pointer`}
                    value={genericDefined || ""}
                    onChange={(e) => setGenericDefined(e.target.value)}
                >
                    <option disabled value="">Selecione o Registro</option>
                    <option value={'brands'}>Marcas</option>
                    <option value={'itemsclasses'}>Classes</option>
                    <option value={'typeitems'}>Tipo de Item</option>
                    <option value={'unitmeasures'}>Unidade de Medida</option>
                    <option value={'groups'}>Grupos</option>
                    <option value={'subgroups'}>SubGrupos</option>
                    <option className="font-bold text-amber-50" disabled value="" >
                        Dados de Localização ...</option>
                    <option value={'countrys'}>Países</option>
                    <option value={'states'}>Estados</option>
                    <option value={'citys'}>Cidades</option>
                    <option value={'zipcodes'}>Ceps</option>
                </select>

                {genericDefined === 'subgroups' && <> <label>Selecionar o Grupo</label>
                    <select className={globalStyles_select}
                        value={children.group?.id || ''}
                        onChange={(e) => {
                            const selected = groups.find(g => g.id === Number(e.target.value))
                            setGeneric({
                                ...children, group: selected as any
                            })
                        }}
                    >
                        <option disabled value="" >Selecione o Grupo ...</option>
                        {groups.map((g) => (
                            <option key={g.id} value={g.id} >{g.id} - {g.name}</option>
                        ))}
                    </select></>}

                {genericDefined === 'citys' && <> <label>Selecionar o Estado</label>
                    <select className={globalStyles_select}
                        value={children.state?.id || ''}
                        onChange={(e) => {
                            const selected = states.find(g => g.id === Number(e.target.value))
                            setGeneric({
                                ...children, state: selected as any
                            })
                        }}
                    >
                        <option disabled value="" >Selecione o Estado ...</option>
                        {states.map((g) => (
                            <option key={g.id} value={g.id} >{g.id} - {g.name}</option>
                        ))}
                    </select></>}

                {genericDefined === 'citys' && <> <label>Selecionar o Pais </label>
                    <select className={globalStyles_select}
                        value={children.country?.id || ''}
                        onChange={(e) => {
                            const selected = countrys.find(g => g.id === Number(e.target.value))
                            setGeneric({
                                ...children, country: selected as any
                            })
                        }}
                    >
                        <option disabled value="" >Selecione o Pais ...</option>
                        {countrys.map((g) => (
                            <option key={g.id} value={g.id} >{g.id} - {g.name}</option>
                        ))}
                    </select></>}

                {genericDefined === 'zipcodes' && <> <label>Selecionar o Município</label>
                    <select className={globalStyles_select}
                        value={children.city?.id || ''}
                        onChange={(e) => {
                            const selected = citys.find(g => g.id === Number(e.target.value))
                            setGeneric({
                                ...children, city: selected as any
                            })
                        }}
                    >
                        <option disabled value="" >Selecione o Município ...</option>
                        {citys.map((g) => (
                            <option key={g.id} value={g.id} >{g.id} - {g.name} - {g.state.acronym}</option>
                        ))}
                    </select></>}

                <form className="space-y-6 mt-10">

                    {genericDefined !== "zipcodes" && <input className="w-full p-3 border rounded-lg"
                        type="text"
                        name='name'
                        value={children.name || "" as any}
                        onChange={handleChange}
                        placeholder={genericDefined && `Digite a Descrição do(a) ${loadGenericDefined()}` || 'Descrição do Registro'}
                    />}

                    {genericDefined === "zipcodes" && <input className="w-full p-3 border rounded-lg"
                        type="text"
                        name='code'
                        value={children.code || "" as any}
                        onChange={handleChange}
                        placeholder={genericDefined && `Digite a Descrição do(a) ${loadGenericDefined()}` || 'Descrição do Registro'}
                    />}

                    {(genericDefined === 'countrys' || genericDefined === 'states') && <input className="w-full p-3 border rounded-lg"
                        type="text"
                        name='acronym'
                        value={children.acronym || "" as any}
                        onChange={handleChange}
                        placeholder='Digite o Acrônimo'
                    />}
                    {genericDefined === 'countrys' && <input className="w-full p-3 border rounded-lg"
                        type="text"
                        name='ddi'
                        value={children.ddi || "" as any}
                        onChange={handleChange}
                        placeholder='Digite o DDI do País'
                    />}
                    {genericDefined === 'countrys' && <input className="w-full p-3 border rounded-lg"
                        type="text"
                        name='codeRevenue'
                        value={children.codeRevenue || "" as any}
                        onChange={handleChange}
                        placeholder='Digite o código da Receita Federal'
                    />}
                    {genericDefined === 'countrys' && <input className="w-full p-3 border rounded-lg"
                        type="text"
                        name='codeCountry'
                        value={children.codeCountry || "" as any}
                        onChange={handleChange}
                        placeholder='Digite o código do País'
                    />}

                    {genericDefined === 'citys' && <input className="w-full p-3 border rounded-lg"
                        type="text"
                        name='codeIbge'
                        value={children.codeIbge || "" as any}
                        onChange={handleChange}
                        placeholder='Digite o código do IBGE'
                    />}

                    <p className="text-gray-300 ">{msg && msg}</p>
                    <a className="px-4 py-2 cursor-pointer bg-green-600 text-white rounded-lg"
                        href="#up-generic"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        {children.id === 0 ? "registrar" : "Atualizar"}
                    </a>
                </form>
            </div>}

            <GenericList
                setGeneric={setGeneric}
                generics={generics}
                genericDefined={genericDefined}
                setShowForm={setShowForm}
            />
        </div>
    </>)
}