import { useEffect, useState } from 'react'
import { TUser } from '../models/TUser'
import { getUser } from './auth'

export function userAuth() {
    const [user, setUser] = useState<TUser | null>(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function loadUser() {
            const u = await getUser()
            setUser(u)
            setLoading(false)
        }
        loadUser()
    }, [])

    const isAdmin = user?.role?.includes("ROLE_ADMIN") ?? false
    const isUser = user?.role?.includes("ROLE_USER") ?? false

    return { user, isAdmin, isUser, loading }
}
