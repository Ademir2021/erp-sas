export type TResponseMessage = {
    success: boolean,
    data: { message: string, id: number, name:string },
    error: string
    details:any
}