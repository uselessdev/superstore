import { Box, Button, Grid, Heading, Text, VStack } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { getBaseUrl } from '@/functions/get-base-url'

export function LoginPage() {
  return (
    <Grid minH="100vh" placeItems="center flex-start" px={8}>
      <Box>
        <VStack spacing={1} alignItems="flex-start" userSelect="none">
          <Heading fontSize="6xl" fontWeight="black">
            lojinha.dev
          </Heading>

          <Text fontSize="md" color="gray.600">
            E-commerce para desenvolvedores front end.
          </Text>
        </VStack>

        <Button
          mt={8}
          onClick={() =>
            signIn('github', {
              callbackUrl: getBaseUrl(),
            })
          }
        >
          Entrar com Github
        </Button>
      </Box>
    </Grid>
  )
}
