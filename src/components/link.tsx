import * as React from 'react'
import type { LinkProps } from 'next/link'
import NextLink from 'next/link'
import {
  Link as ChakraLink,
  type LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'

export const Link = React.forwardRef<
  HTMLAnchorElement,
  React.PropsWithChildren<LinkProps & ChakraLinkProps>
>(function render({ children, ...props }, linkRef) {
  return (
    <ChakraLink
      as={NextLink}
      _hover={{ textDecoration: 'none' }}
      ref={linkRef}
      {...props}
    >
      {children}
    </ChakraLink>
  )
})
