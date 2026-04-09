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
        })
        if (!response.ok) {
            router.push('/login')
            return
        }
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`)
        }
        const data = await response.json()
        setHandle(data)
    } catch (error) {
        console.error("Erro na requisição:", error)
    }
}