import type { AppType } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'
import { ChakraProvider } from '@chakra-ui/react'
import { api } from '@/lib/api'
import { theme } from '@/theme'
import { Layout } from '@/components/layout'

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default api.withTRPC(App)
