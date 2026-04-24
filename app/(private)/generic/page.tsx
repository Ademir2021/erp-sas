'use client'

import { useEffect, useState } from "react";
import GenericsForm from "@/app/components/Generic/GenericForm";
import { userAuth } from "@/app/lib/userAuth";
import { useRouter } from 'next/navigation'
import { loadHandle } from "@/app/lib/handleApi";
import { TGeneric } from "@/app/models/TGeneric";
import { TResponseMessage } from "@/app/models/TMessage";
import { Tgroup } from "@/app/models/TItem";

function useGenericState<T>() {
    const [generic, setGeneric] = useState<TGeneric>({
        id: 0,
        name: '',
        group: { id: 0, name: '' },
        acronym: '',
        ddi: '',
        codeCountry: '',
        codeRevenue: ''
    });
    const [generics, setGenerics] = useState<TGeneric[]>([])

    return { generic, setGeneric, generics, setGenerics }
}

export default function Generics() {

    const router = useRouter()
    const { user } = userAuth();

    const [msg, setMsg] = useState('')
    const [flag, setFlag] = useState(false)

    const { generic, setGeneric } = useGenericState<TGeneric>()
    const { generics, setGenerics } = useGenericState<TGeneric[]>();
    const [genericDefined, setGenericDefined] = useState<string>("");
    const [groups, setGroups] = useState<Tgroup[]>([])

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setGeneric({ ...generic, [name]: value })
    }

    useEffect(() => {
        const token = user?.token as string
        if (genericDefined === 'subgroups')
            loadHandle(token, setGroups, 'groups', router)

    }, [genericDefined])

    useEffect(() => {
        const token = user?.token as string
        if (genericDefined !== "")
            loadHandle(token, setGenerics, genericDefined, router)
    }, [user, genericDefined]);

    async function updateGeneric(generic: TGeneric) {
        const params = new URLSearchParams({
            name: genericDefined,
        });
        const res = await fetch(`/api/generic?${params}`, {
            method: 'PUT',
            body: JSON.stringify(generic),
        });
        const resp: TResponseMessage = await res.json();
        if (!res.ok) {
            setMsg(`Erro ao atualizar Item: ${resp.error}`)
            return
        }
        router.push('/generic')
        setMsg(`${resp.data.message} ID: ${resp.data.id} : ${resp.success}`)
        setFlag(true)
        router.refresh()
    }

    async function saveGeneric(generic: TGeneric) {
        const params = new URLSearchParams({
            name: genericDefined,
        });
        const res = await fetch(`/api/generic?${params}`, {
            method: 'POST',
            body: JSON.stringify(generic),
        });
        const resp: TResponseMessage = await res.json();
        if (!res.ok) {
            setMsg(`Erro ao registrar Generics: ${resp?.details}`)
            return
        }
        router.push('/generic')
        setMsg(`${resp.data.message} Name: ${resp.data.name} : ${resp.success}`)
        setFlag(true)
        router.refresh()
    }

    function valFields(generic: TGeneric) {
        const missing: string[] = [];
        if (genericDefined === "") missing.push("Tipo de Registro !!")
        if (generic.name === "") missing.push('Nome');
        if (genericDefined === 'subgroups') {
            if (generic.group?.id === 0) missing.push('ID do Grupo');
        }
        if (missing.length === 0) {
            return true;
        }
        return 'Falta preencher os campos: ' + missing.join(', ') + '.';
    }

    function handleSubmit(e: Event) {
        e.preventDefault()
        if (valFields(generic) === true && flag === false) {
            generic.id === 0 ? saveGeneric(generic) : updateGeneric(generic)
        } else {
            setMsg(valFields(generic) as any)
        }
        if (flag === true)
            setMsg(generic.id === 0 ? 'Arquivo já foi registrado.' : "Arquivo já foi atualizado.")
    }

    return (
        <>
            <p>{JSON.stringify(generic)}</p>
            <GenericsForm
                setGenericDefined={setGenericDefined}
                handleChange={handleChange}
                genericDefined={genericDefined}
                generics={generics}
                setGeneric={setGeneric}
                handleSubmit={handleSubmit}
                msg={msg}
                groups={groups}
            >
                {generic}
            </GenericsForm>
        </>
    )
}