import type { NextPage } from 'next'
import { EventsPage } from '@/modules/events'
import { useCompany } from '@/modules/companies'
import { api } from '@/lib/api'

const Events: NextPage = () => {
  const { company } = useCompany()

  const { data, isLoading } = api.events.all.useQuery(
    { company: company?.id as string },
    { enabled: Boolean(company?.id) }
  )

  if (isLoading) {
    return null
  }

  return <EventsPage events={data} />
}

export default Events
