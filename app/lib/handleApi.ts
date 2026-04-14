import { TResponseMessage } from "../models/TMessage"

export async function loadHandle(
    token: string,
    setHandle: Function,
    url: string,
    router: any) {
    try {
    
        if (!token) return
        const response = await fetch(`/api/${url}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data: TResponseMessage = await response.json()

        if (data.error) {
            throw new Error(`Erro: ${data.error}`)
        };

        if (!response.ok) {
            router.push('/login')
            return
        };

        setHandle(data)

    } catch (error) {
        console.error("Erro na requisição:", error)
    }
}

