import { TGeneric } from "@/app/models/TGeneric";
import { globalStyles_form } from "../GlobalStyles";

type Props = {
    children: TGeneric
    handleChange: any
    setGenericDefined: React.Dispatch<React.SetStateAction<string>>
    genericDefined: string
}

export default function GenericForm({
    children, handleChange, setGenericDefined,
    genericDefined }: Props) {

    function loadGenericDefined() {
        if (genericDefined === 'brands')
            return 'Marca'
    }
    return (
        <>
            <div className={`${globalStyles_form} max-w-xl mx-auto`}>
                {children.id != 0 ? <> <b>Atualizar Registro</b>
                    <div>{"ID:" + String(children.id).padStart(9, '0') + " - " + children.name} </div> </> :
                    <p className="font-bold mb-3">Novo Registro</p>}
                <label className="" >Selecionar O Tipo de Registro</label>
                <select className="w-full p-3 border bg-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={''}
                    onChange={(e) => setGenericDefined(e.target.value)}
                >
                    <option disabled value="">Selecione o Registro</option>
                    <option value={'brands'} >Marcas</option>
                    <option value={''} >Grupos</option>
                    <option value={''} >SubGrupos</option>
                    <option className="bg-white" disabled value="" >---------</option>
                    <option value={''} >Cidades</option>
                    <option value={''} >CEPs</option>
                    <option value={''} ></option>
                    <option value={''} ></option>
                    <option value={''} ></option>
                </select>
                <form id="up-item" className="space-y-6 mt-10">
                    <input className="w-full p-3 border rounded-lg"
                        type="text"
                        name='name'
                        value={children.name || "" as any}
                        onChange={handleChange}
                        placeholder={genericDefined && `Descrição da ${loadGenericDefined()}` || 'Descrição do Registro'}
                    />
                    <button className="px-4 py-2 cursor-pointer bg-green-600 text-white rounded-lg">
                        {children.id === 0 ? "registrar" : "Atualizar"}
                    </button>
                </form>
            </div>
        </>
    )
}