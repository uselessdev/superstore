import * as React from 'react'
import type { FlexProps } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'

export function PageContent(props: React.PropsWithChildren<FlexProps>) {
  return (
    <Flex
      as="main"
      py={4}
      gap={6}
      w="full"
      flexDirection="column"
      alignItems="flex-start"
      {...props}
    />
  )
}
