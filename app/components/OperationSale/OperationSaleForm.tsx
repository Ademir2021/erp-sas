'use client'

import { useState } from "react"
import ShowForm from "../ShowForm"
import { globalStyles_form, globalStyles_select } from "../GlobalStyles"
import { TOperationSale } from "@/app/models/TSale"
import OperationSaleList from "./OperationSaleList"

type Props = {
    children: TOperationSale
    setChildren: Function
    handleChange: any
    operationSales: TOperationSale[]
    handleSubmit: any
    msg: string
}

export default function OperationSaleForm({ children, handleChange,
    operationSales, setChildren, handleSubmit, msg }: Props) {

    const [showForm, setShowForm] = useState(false)

    return (<>
        <ShowForm
            showForm={showForm}
            setShowForm={setShowForm}
        />
        <div id="up-operationsale">
            {showForm && <div className={`${globalStyles_form} max-w-xl mx-auto`}>
                {children?.id != 0 ? <> <b>Atualizar Registro</b>
                    <div>{"ID:" + String(children?.id).padStart(9, '0') + " - "
                        + children?.description} </div> </> :
                    <p className="font-bold mb-3">Novo Registro</p>}
                <form className="space-y-6 mt-10">
                    <input className="w-full p-3 border rounded-lg"
                        type="text"
                        name='description'
                        value={children.description || ""}
                        onChange={handleChange}
                        placeholder='Digite a Descrição da Operação'
                    />

                    <label >Selecionar a natureza da Operação: {children?.defaultNature}</label>
                    <select className={`${globalStyles_select} cursor-pointer`}
                        name="defaultNature"
                        value={children.defaultNature || ""}
                        onChange={handleChange}
                    >
                        <option disabled value="">Selecione a Natureza da Operação ...</option>
                        <option value={'Venda de Mercadoria'}>Venda de Mercadoria</option>
                        <option value={'Orcamento'}>Orçamento</option>
                    </select>


                    <label >Selecionar o Tipo: {children.type && `Selecionado: ${children?.type}`}</label>
                    <select className={`${globalStyles_select} cursor-pointer`}
                        name="type"
                        value={children.type || ""}
                        onChange={handleChange}
                    >
                        <option disabled value="">Selecione o Tipo ...</option>
                        <option value={'entrada'}>Entrada</option>
                        <option value={'saida'}>Saída</option>
                    </select>


                    <label >Selecionar o CFOP: {children.cfop && `Selecionado: ${children?.cfop}`}</label>
                    <select className={`${globalStyles_select} cursor-pointer`}
                        name="cfop"
                        value={children.cfop || ""}
                        onChange={handleChange}
                    >
                        <option disabled value="">Selecione o CFOP ...</option>
                        <option value={'5102'}>Venda de mercadoria adquirida de terceiros</option>
                        <option value={'5933'}> Prestação de serviço tributado pelo ISSQN</option>
                    </select>
                    <div className="grid grid-cols-2 gap-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name='active'
                                checked={children.active || false}
                                onChange={handleChange}
                            />
                            Ativo
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name='controlsStock'
                                checked={children.controlsStock || false}
                                onChange={handleChange}
                            />
                            Controla Estoque
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name='generateFinancial'
                                checked={children.generateFinancial || false}
                                onChange={handleChange}
                            />
                            Gera Financeiro
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name='allowDiscount'
                                checked={children.allowDiscount || false}
                                onChange={handleChange}
                            />
                            Permite Desconto
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name='finalConsumer'
                                checked={children.finalConsumer || false}
                                onChange={handleChange}
                            />
                            Consumidor Final
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name='requiresInvoice'
                                checked={children.requiresInvoice || false}
                                onChange={handleChange}
                            />
                            Requer Fatura
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name='isReturn'
                                checked={children.isReturn || false}
                                onChange={handleChange}
                            />
                            É Retorno
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name='updateCost'
                                checked={children.updateCost || false}
                                onChange={handleChange}
                            />
                            Atualiza Custo
                        </label>
                    </div>
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
        </div>
        <OperationSaleList
            operationSales={operationSales}
            setChildren={setChildren}
            setShowForm={setShowForm}
        />
    </>
    )
}