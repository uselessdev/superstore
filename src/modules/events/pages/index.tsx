import { createColumnHelper } from '@tanstack/react-table'
import type { User } from '@prisma/client'
import { Text } from '@chakra-ui/react'
import { PageHeader } from '@/components/page-header'
import { PageContent } from '@/components/page-content'
import { Table } from '@/components/table'
import type { Events } from '@/events'
import { EmptyState } from '@/components/empty-state'
import { getActionReadable } from '../functions/actions-readable'
import { relativeDates } from '../functions/relative-dates'

type EventWithActor = {
  event: string
  actor: User
  createdAt: Date
}

const column = createColumnHelper<EventWithActor>()

const columns = [
  column.accessor(
    ({ actor, createdAt, event }) =>
      `${actor.name} ${getActionReadable(event as Events)} ${relativeDates(
        createdAt
      )}`,
    {
      header: 'Eventos',
      cell: info => info.getValue(),
    }
  ),
]

type Props = {
  events?: EventWithActor[]
}

export function EventsPage({ events }: Props) {
  return (
    <>
      <PageHeader
        title="Eventos"
        subtitle="Aqui você pode encontrar todos os eventos ocorridos na sua loja."
      />

      <PageContent>
        {Boolean(events?.length) ? (
          <Table columns={columns} data={events} />
        ) : null}

        {!Boolean(events?.length) ? (
          <EmptyState>
            <Text>Nenhum evento criado ainda.</Text>
          </EmptyState>
        ) : null}
      </PageContent>
    </>
  )
}
