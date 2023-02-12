import * as React from 'react'
import type { Company } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { api } from '@/lib/api'

const CompanyContext = React.createContext<{
  company: Company | null | undefined
  refetch: () => void
  isLoading: boolean
}>({ company: null, refetch: () => null, isLoading: false })

export function CompanyProvider(props: React.PropsWithChildren<unknown>) {
  const { data: session } = useSession()
  const { data, refetch, isLoading } = api.companies.find.useQuery(undefined, {
    enabled: Boolean(session?.user),
  })

  return (
    <CompanyContext.Provider
      {...props}
      value={{ company: data, refetch, isLoading }}
    />
  )
}

export function useCompany() {
  return React.useContext(CompanyContext)
}
