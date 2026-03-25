import { z } from "zod"
import { cpf, cnpj } from "cpf-cnpj-validator"

export const cadastroSchema = z.object({
  tipoPessoa: z.enum(["pf", "pj"]),

  nome: z.string().optional(),
  cpf: z.string().optional(),
  rg: z.string().optional(),

  razaoSocial: z.string().optional(),
  nomeFantasia: z.string().optional(),
  cnpj: z.string().optional(),

  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone inválido"),
}).superRefine((data, ctx) => {

  if (data.tipoPessoa === "pf") {
    if (!data.nome) {
      ctx.addIssue({ path: ["nome"], code: "custom", message: "Nome obrigatório" })
    }

    if (!data.cpf || !cpf.isValid(data.cpf)) {
      ctx.addIssue({ path: ["cpf"], code: "custom", message: "CPF inválido" })
    }
  }

  if (data.tipoPessoa === "pj") {
    if (!data.razaoSocial) {
      ctx.addIssue({ path: ["razaoSocial"], code: "custom", message: "Razão Social obrigatória" })
    }

    if (!data.cnpj || !cnpj.isValid(data.cnpj)) {
      ctx.addIssue({ path: ["cnpj"], code: "custom", message: "CNPJ inválido" })
    }
  }
})