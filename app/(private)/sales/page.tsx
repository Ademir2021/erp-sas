'use client'

import { useEffect, useState } from "react"
import { TSale } from "@/app/models/TSale"
import { UserRole } from "@/app/models/TUser"

export default function Sales() {

    
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
        itemsSale: []
    })


    return <>

    </>
}