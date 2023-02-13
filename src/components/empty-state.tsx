import * as React from 'react'
import { Grid, Img, Text } from '@chakra-ui/react'

export function EmptyState({ children }: React.PropsWithChildren<unknown>) {
  return (
    <Grid w="full" h="full" py={12} placeItems="center" gap={4}>
      <Grid placeItems="center" gap={4}>
        <Img src="/assets/images/empty-state.svg" />
        <Text fontFamily="monospace" fontWeight="semibold" color="gray.600">
          {children}
        </Text>
      </Grid>
    </Grid>
  )
}
