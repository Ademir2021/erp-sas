// 'use client'
import { TCashMovement } from "@/app/models/TCashMovement"
import CashmovementList from "./CashmovementList"


type Props = {
    cashmovements:TCashMovement[]
}

export default function CashmovementForm({cashmovements}:Props){

    return <>
      <p>Movimento do Caixa</p>
    <CashmovementList
    cashmovements={cashmovements}
    />
    </>
}