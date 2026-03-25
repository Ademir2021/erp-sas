import axios from "axios"

export async function buscarCNPJ(cnpj: string) {
  const clean = cnpj.replace(/\D/g, "")

  const response = await axios.get(
    `https://brasilapi.com.br/api/cnpj/v1/${clean}`
  )

  return response.data
}