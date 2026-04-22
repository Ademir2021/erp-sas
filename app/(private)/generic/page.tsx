'use client'

import { useEffect, useState } from "react";
import GenericsForm from "@/app/components/Generic/GenericForm";
import { userAuth } from "@/app/lib/userAuth";
import { useRouter } from 'next/navigation'
import { loadHandle } from "@/app/lib/handleApi";
import { TGeneric } from "@/app/models/TGeneric";

function useGenericState<T>() {
    const [generic, setGeneric] = useState<TGeneric>({
        id: 0,
        name: ''
    });
    const [generics, setGenerics] = useState<TGeneric[]>([])

    return { generic, setGeneric, generics, setGenerics }
}

export default function Generics() {

    const router = useRouter()
    const { user } = userAuth();

    const { generic, setGeneric } = useGenericState<TGeneric>()
    const { generics, setGenerics } = useGenericState<TGeneric[]>();
    const [genericDefined, setGenericDefined] = useState<string>("");

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setGeneric({ ...generic, [name]: value })
    }

    useEffect(() => {
        const token = user?.token as string
        if (genericDefined !== "")
            loadHandle(token, setGenerics, genericDefined, router)
    }, [user, genericDefined]);


    return (
        <div>
            <p>{JSON.stringify(genericDefined)}</p>
            <p>{JSON.stringify(generic)}</p>
            <hr />
            <GenericsForm
                setGenericDefined={setGenericDefined}
                handleChange={handleChange}
                genericDefined={genericDefined}
            >
                {generic}
            </GenericsForm>
            <p>{JSON.stringify(generics)}</p>
        </div>
    )
}