import type { GetServerSidePropsContext, NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { LoginPage } from '@/modules/auth'
import { PageHeader } from '@/components/page-header'
import { useCompany } from '@/modules/companies'
import { authOptions } from './api/auth/[...nextauth]'

const Home: NextPage = () => {
  const { status } = useSession()
  const { company } = useCompany()

  if (status === 'unauthenticated') {
    return <LoginPage />
  }

  return <PageHeader title={company?.tradeName} />
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
