'use client'

import { useEffect, useState } from "react";
import PersonForm from "@/app/components/Person/PersonForm";
import { TPerson, TypePerson, Gender, TGroupPerson } from "@/app/models/TPerson";
import { UserRole } from "@/app/models/TUser";
import { useRouter } from 'next/navigation'
import { TZipCode } from "@/app/models/TAddress";
import { loadHandle } from "@/app/lib/handleApi";
import { TResponseMessage } from "@/app/models/TMessage";
import { userAuth } from "@/app/lib/userAuth";

export default function Person() {

    const router = useRouter()
    const [zipcodes, setZipcodes] = useState<TZipCode[]>([])
    const [groupPersons, setGroupPersons] = useState<TGroupPerson[]>([])
    const [persons, setPersons] = useState<any[]>([])
    const { user } = userAuth();
    const [msg, setMsg] = useState('')
    const initialPerson:TPerson = {
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
            role: "ADMIN" as UserRole,
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
    }
    const [person, setPerson] = useState<TPerson>(initialPerson)

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setPerson({ ...person, [name]: value })
    }

    function clearFields (){
        setPerson({...initialPerson})
    }

    useEffect(() => {
        const token = user?.token as string
        loadHandle(token, setZipcodes, 'zipcodes', router)
        loadHandle(token, setGroupPersons, 'grouppersons', router)
        loadHandle(token, setPersons, 'person', router)
    }, [user]);

    function loadReplaceCPF(person: TPerson): void {
        if (!person?.cpf) return;
        person.cpf = person?.cpf.replace(/\D/g, '');
    };
    function loadReplaceCNPJ(person: TPerson): void {
        if (!person?.cnpj) return;
        person.cnpj = person?.cnpj.replace(/[../-]/g, '');
    };
    function loadReplacePhone(person: TPerson): void {
        if (!person?.phone) return;
        person.phone = person?.phone.replace(/[()-]/g, '');
    };
    function loadReplaceRG(person: TPerson): void {
        if (!person?.rg) return;
        person.rg = person?.rg.replace(/[..-]/g, '');
    };

    async function updatePerson(person: TPerson) {
        loadReplaceCPF(person)
        loadReplaceCNPJ(person)
        loadReplacePhone(person)
        loadReplaceRG(person)
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
        person.cpf = person.cpf || null as any
        person.rg = person.rg || null as any
        person.cnpj = person.cnpj || null as any
        person.inscricState = person.inscricState || null as any
        loadReplaceCPF(person);
        loadReplaceCNPJ(person);
        loadReplacePhone(person);
        loadReplaceRG(person);
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

    function valFields(p: TPerson) {
        const missing: string[] = [];
        if (p.name === "") missing.push('Nome');
        if (p.typePerson > 1 && p.typePerson < 5) missing.push('Tipo');
        if (p.groupPerson.id === 0) missing.push('Grupo');
        if (p.branch.id === 0) missing.push('Filial');
        if (p.email === "") missing.push('Email');
        if (p.phone === "") missing.push('Telefone');
        if (p.dateOfBirth === "") missing.push('Nascimento');
        if (p.gender < 0 || p.gender > 2) missing.push('Gênero');
        if (p.cpf === "" && p.cnpj === "") missing.push('CPF/CNPJ');
        if (p.rg === "" && p.inscricState === "") missing.push('RG/Inscr.');
        if (p.address.street === "") missing.push('Rua/Avenida');
        if (p.address.number === "") missing.push('Adr/Número');
        if (p.address.neighborhood === "") missing.push('Bairro');
        if (p.address.complement === "") missing.push('Adr/Complemento');
        if (p.address.zipCode?.id === 0) missing.push('Cep');
        if (missing.length === 0) {
            return true;
        }
        return 'Falta preencher os campos: ' + missing.join(', ') + '.';
    }

    function handleSubmit(e: Event) {
        e.preventDefault()
        if (valFields(person) === true) {
            person.id === 0 ? savePerson(person) : updatePerson(person);
            clearFields()
        } else {
            setMsg(valFields(person) as any)
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