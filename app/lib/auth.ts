export async function getUser() {
    const res = await fetch("/api/me", {
        cache: "no-store",
        credentials: "include"
    })
    const data = await res.json()
    return data.user
}

export const API_URL = process.env.API_URL