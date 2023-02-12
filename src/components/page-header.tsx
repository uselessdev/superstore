import * as React from 'react'
import type { FlexProps } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { Flex, Heading } from '@chakra-ui/react'

type Props = React.PropsWithChildren<
  FlexProps & {
    title: React.ReactNode
    subtitle?: string
  }
>

export function PageHeader({ title, subtitle, children, ...props }: Props) {
  return (
    <Flex
      as="header"
      px={6}
      h="70px"
      alignItems="center"
      justifyContent="space-between"
      {...props}
    >
      <Box>
        <Heading fontSize="xl">{title}</Heading>
        {subtitle ? (
          <Text fontSize="xs" color="gray.500">
            {subtitle}
          </Text>
        ) : null}
      </Box>

      <Flex gap={4}>{children}</Flex>
    </Flex>
  )
}
