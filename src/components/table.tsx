import * as React from 'react'
import {
  TableContainer,
  Table as ChakraTable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react'
import type { ColumnDef } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'

type Props<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[]
  data?: T[]
}

export function Table<T>(props: Props<T>) {
  const table = useReactTable<T>({
    data: props.data ?? [],
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <TableContainer w="full">
      <ChakraTable>
        <Thead>
          {table.getHeaderGroups().map(group => (
            <Tr key={group.id}>
              {group.headers.map(header => (
                <Th _first={{ pl: 7 }} key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map(row => (
            <Tr
              key={row.id}
              _hover={{ bgColor: 'gray.100', _dark: { bgColor: 'gray.700' } }}
            >
              {row.getVisibleCells().map(cell => (
                <Td
                  key={cell.id}
                  _first={{ pl: 7 }}
                  _last={{ pr: 7 }}
                  fontSize="sm"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  )
}
