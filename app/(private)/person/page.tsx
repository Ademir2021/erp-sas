'use client'

import { useEffect, useState } from "react";
import PersonForm from "@/app/components/Person/PersonForm";
import { TPerson, TypePerson, Gender, TGroupPerson } from "@/app/models/TPerson";
import { TUser, UserRole } from "@/app/models/TUser";
import { useRouter } from 'next/navigation'
import { getUser } from "@/app/lib/auth";
import { TZipCode } from "@/app/models/TAddress";
import { loadHandle } from "@/app/lib/handleApi";

type TResponseMessage = {
    success: boolean,
    data: { message: string, id: number },
    error: string
}

export default function Person() {

    const router = useRouter()
    const [statusSavePerson, setStatusSavePerson] = useState(false)
    const [zipcodes, setZipcodes] = useState<TZipCode[]>([])
    const [groupPersons, setGroupPersons] = useState<TGroupPerson[]>([])
    const [persons, setPersons] = useState<any[]>([])
    const [user, setUser] = useState<TUser | null>(null)
    const [msg, setMsg] = useState('')
    const [person, setPerson] = useState<TPerson>({
        id: 0,
        typePerson: TypePerson.FISICA,
        groupPerson: { id: 0, name: '' },
        branch: {
            id: 1,
            name: 'Filial - Matriz'
        },
        user: {
            id: 0,
            login: '',
            password: '',
            roles: UserRole.ADMIN,
            token: ''
        },
        name: '',
        age: 0,
        dateOfBirth: "",
        gender: Gender.MASCULINO,
        cpf: '',
        rg: '',
        email: '',
        phone: '',
        cnpj: '',
        inscricState: '',
        address: {
            id: 0,
            street: '',
            number: '',
            neighborhood: '',
            complement: '',
            zipCode: {
                id: 0,
                code: '',
            }
        }
    })

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setPerson({ ...person, [name]: value })
    }

    useEffect(() => {
        async function loadUser() {
            const user = await getUser()
            setUser(user)
            if (user) {
                person.user.roles = user.roles
                person.user.token = user.token
            }
        }
        loadUser()
    }, [])

    useEffect(() => {
        const token = user?.token as string
        loadHandle(token, setZipcodes, 'zipcodes')
        loadHandle(token, setGroupPersons, 'grouppersons')
        loadHandle(token, setPersons, 'person')
    }, [user]);

    async function updatePerson(person: TPerson) {
        if (user) {
            person.user.token = user.token
            person.user.roles = user.roles
        }
        const res = await fetch('/api/person', {
            method: 'PUT',
            body: JSON.stringify(person),
        })

        const resp: TResponseMessage = await res.json()

        if (!res.ok) {
            setMsg(`Erro ao atualizar Pessoa: ${resp.error}`)
            return
        }
        router.push('/person')
        setMsg(`${resp.data.message} ID: ${resp.data.id} : ${resp.success}`)
        router.refresh()
    }

    async function savePerson(person: TPerson) {
        if (person)
            person.user.id = user?.id || 0
        person.user.login = user?.login || ""
        person.user.roles = 0 as any
        person.cpf = person.cpf || null as any
        person.rg = person.rg || null as any
        person.cnpj = person.cnpj || null as any
        person.inscricState = person.inscricState || null as any

        const res = await fetch('/api/person', {
            method: 'POST',
            body: JSON.stringify(person),
        })

        if (!res.ok) {
            setMsg(`Erro ao registrar Pessoa: ${JSON.stringify(res)}`)
            return
        }

        router.push('/person')
        setMsg('Pessoa registrado com sucesso')
        router.refresh()
    }

    function handleSubmit(e: Event) {
        e.preventDefault()
        if (statusSavePerson === false) {
            person.id === 0 ? savePerson(person) :
                updatePerson(person)
            setStatusSavePerson(true)
        } else {
            return person.id !== 0 ? setMsg("Pessoa já foi atualizada") :
                setMsg('Pessoa já foi gravada')
        }
    }

    return <>
        <PersonForm
            handleChange={handleChange}
            handleSubmit_={handleSubmit}
            msg={msg}
            setChildren={setPerson}
            zipcodes={zipcodes}
            groupPersons={groupPersons}
            persons={persons}
        >
            {person}
        </PersonForm>
    </>
}