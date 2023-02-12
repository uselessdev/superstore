import * as React from 'react'
import {
  Button,
  Flex,
  Grid,
  Heading,
  VStack,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
  useDisclosure,
  Input,
} from '@chakra-ui/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { sidebarmenu } from '@/menu'
import { getBaseUrl } from '@/functions/get-base-url'
import { Link } from './link'

export function Layout({ children }: React.PropsWithChildren<unknown>) {
  const { pathname } = useRouter()
  const { status: session } = useSession()
  const { onClose } = useDisclosure()

  if (session === 'unauthenticated' && pathname === '/') {
    return <>{children}</>
  }

  return (
    <>
      <Grid w="full" minH="100vh" gridTemplateColumns="260px 1fr">
        <Flex
          as="aside"
          w="full"
          flexDirection="column"
          borderRightWidth={1}
          bgColor="white"
        >
          <Input
            variant="unstyled"
            placeholder="Pesquisar..."
            px={8}
            w="full"
            h="70px"
            rounded={0}
            borderBottomWidth={1}
            fontWeight="semibold"
            _focus={{
              borderBottomColor: 'gray.400',

              _dark: {
                borderBottomColor: 'gray.100',
              },
            }}
            _placeholder={{
              _dark: {
                color: 'gray.50',
              },
            }}
            _dark={{
              color: 'gray.50',
            }}
          />

          <VStack as="nav" spacing={1} py={4} px={4}>
            {sidebarmenu.map(item => (
              <Link
                key={item.href}
                href={item.href}
                py={2}
                px={4}
                gap={2}
                w="full"
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                fontSize="md"
                fontWeight="semibold"
                rounded="sm"
                color="gray.600"
                _hover={{
                  bgColor: 'gray.50',

                  _dark: {
                    bgColor: 'gray.800',
                  },
                }}
                _focus={{
                  outline: 'none',
                  bgColor: 'gray.50',
                  shadow: 'none',

                  _dark: {
                    bgColor: 'gray.800',
                  },
                }}
                _dark={{
                  color: 'gray.50',
                }}
              >
                <Icon as={item.icon} fontSize="lg" />
                {item.text}
              </Link>
            ))}
          </VStack>
          <VStack w="full" mt="auto" alignItems="flex-start" py={6} px={4}>
            <Heading px={4} userSelect="none" fontSize="sm">
              Book Store
            </Heading>
            <Button
              size="sm"
              px={4}
              colorScheme="red"
              variant="ghost"
              onClick={() => signOut({ callbackUrl: getBaseUrl() })}
              leftIcon={<Icon as={ArrowRightOnRectangleIcon} />}
            >
              sair
            </Button>
          </VStack>
        </Flex>

        <Grid
          as="main"
          w="full"
          bgColor="gray.50"
          gridTemplateRows="70px 1fr"
          _dark={{
            bgColor: 'gray.800',
          }}
        >
          {children}
        </Grid>
      </Grid>

      <Modal isOpen={session === 'unauthenticated'} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(6px)" />
        <ModalContent>
          <ModalBody p={8}>
            <VStack alignItems="flex-start" spacing={8}>
              <Text fontSize="lg" fontFamily="monospace">
                Parece que você não está logado, clique no botão a baixo para
                realizar login.
              </Text>
              <Button w="full" onClick={() => signIn('github')}>
                Entrar com Github
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
