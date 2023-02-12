import { z } from 'zod'
import * as CNPJ from '@fnando/cnpj'

export const companySchema = z.object({
  tradeName: z.string().min(2, { message: 'O nome é muito curto.' }),
  companyName: z.string().min(4, { message: 'A razão social é muito curta.' }),
  cnpj: z
    .string()
    .refine(value => CNPJ.isValid(value), { message: 'CNPJ Inválido.' }),
  website: z.string().optional(),
})

export type CompanySchema = z.infer<typeof companySchema>
