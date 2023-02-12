import type { AppType } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'
import { ChakraProvider } from '@chakra-ui/react'
import { api } from '@/lib/api'
import { theme } from '@/theme'
import { Layout } from '@/components/layout'
import { CompanyProvider } from '@/modules/companies'

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <CompanyProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CompanyProvider>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default api.withTRPC(App)
