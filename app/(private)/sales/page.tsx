'use client'

import { useEffect, useState } from "react"
import { TItemsSale, TOperationSale, TSale } from "@/app/models/TSale"
import { TUser, UserRole } from "@/app/models/TUser"
import { useRouter } from 'next/navigation'
import SaleForm from "@/app/components/Sale/SaleForm"
import { TItem } from "@/app/models/TITem"
import { getUser } from "@/app/lib/auth"
import { TResponseMessage } from "@/app/models/TMessage"
import { TPerson } from "@/app/models/TPerson"
import { loadHandle } from "@/app/lib/handleApi"


export default function Sales() {

    const router = useRouter()
    const [operationsSale, setOperationsSale] = useState<TOperationSale[]>([])
    const [persons, setPersons] = useState<TPerson[]>([])
    const [statusSaveSale, setStatusSaveSale] = useState(false)
    const [msg, setMsg] = useState('')
    const [searchItemName, setSearchITemName] = useState('!')
    const [user, setUser] = useState<TUser>()
    const [items, setItems] = useState<TItem[]>([])
    const [itemsSale, setItemsSale] = useState<TItemsSale[]>([])
    const [sale, setSale] = useState<TSale>({
        branch: { id: 1, name: '' },
        user: {
            id: 0,
            login: '',
            password: '',
            roles: UserRole.ADMIN,
            token: ''
        },
        person: { id: 0 },
        discount: 0,
        itemsSale: [],
        operationSale:{id:0,description:'',type:"",controlsStock:false,
            generateFinancial:false,allowDiscount:false,updateCost:false,
            requiresInvoice:false,isReturn:false,cfop:'',defaultNature:'',
            active:true
        }
    })
    const [operationSale, setOperationSale] = useState<TOperationSale>(sale.operationSale)


    useEffect(() => {
        async function loadUser() {
            const user = await getUser()
            setUser(user)
            if (user) {
                const userSale: TUser = {
                    id: user.id,
                    login: user.login,
                    roles: user.roles,
                    token: user.token
                }
                sale.user = userSale
            }
        }
        loadUser()
    }, [])

    useEffect(() => {
        const token = user?.token as string
        loadHandle(token, setPersons, 'person')
          loadHandle(token, setOperationsSale, 'operationsale')
    }, [user]);

    useEffect(() => {

        async function searchItemsByName() {

            const token = user?.token
            const params = new URLSearchParams({
                name: searchItemName,
            })
            try {
                if (!token) return
                const response = await fetch(`/api/itemsale?${params.toString()}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (!response.ok) {
                    throw new Error(`Erro: ${response.status}`)
                }
                const data: TItem[] = await response.json()
                setItems(data)
            } catch (error) {
                console.error("Erro na requisição:", error)
            }
        }
        setItems([])
        searchItemsByName()
    }, [user, searchItemName])

    function loadItemsSale(sale: TSale | any  ) {

        if (itemsSale.length > 0) {
            sale.itemsSale = itemsSale.map(i => ({
                item: { id: i.item.id },
                amount: i.amount,
                price: i.price,
                tItem: i.amount * i.price
            }))
        };

        
    }

    async function saveSale(sale: TSale) {

        const res = await fetch('/api/sale', {
            method: 'POST',
            body: JSON.stringify(sale),
        })

        const resp: TResponseMessage = await res.json()

        if (!res.ok) {
            setMsg(`Erro ao registrar Venda: ${JSON.stringify(resp)}`)
            return
        }

        router.push('/sales')
        setMsg(`Mensagems: ${resp.data.message}, ID Venda:${resp.data.id}, Venda OK:${resp.success}`)
        router.refresh()
    }

    function hanldeSubmit(e: Event) {
        e.preventDefault()
        if (statusSaveSale === false) {
            loadItemsSale(sale)
            // saveSale(sale)
            // setStatusSaveSale(true)
        } else {
            setMsg("Esta venda já foi gravada")
        }
    }


    return <>
        {/* <p>{JSON.stringify(sale)}</p> */}
        <SaleForm
            setSearchITemName={setSearchITemName}
            items={items}
            itemsSale={itemsSale}
            setItemsSale={setItemsSale}
            handleSubmit={hanldeSubmit}
            msg={msg}
            setChildren={setSale}
            persons={persons}
            operationsSale={operationsSale}
            setOperationSale={setOperationSale}
            operationSale={operationSale as any}
        >
            {sale}
        </SaleForm>
    </>
}