import { Text } from '@chakra-ui/react'
import type { GetServerSidePropsContext, NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { LoginPage } from '@/modules/auth'
import { authOptions } from './api/auth/[...nextauth]'

const Home: NextPage = () => {
  const { status } = useSession()

  if (status === 'unauthenticated') {
    return <LoginPage />
  }

  return <Text>Hello World!</Text>
}

export default Home

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  return {
    props: {
      session: await unstable_getServerSession(req, res, authOptions),
    },
  }
}
