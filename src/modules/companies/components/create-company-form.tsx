import {
  chakra,
  Box,
  Grid,
  Heading,
  Text,
  VStack,
  Button,
} from '@chakra-ui/react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signOut } from 'next-auth/react'
import { api } from '@/lib/api'
import { Field } from '@/components/field'
import type { CompanySchema } from '../validations'
import { companySchema } from '../validations'
import { useCompany } from '../context/company'

export function CreateCompanyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CompanySchema>({
    resolver: zodResolver(companySchema),
  })

  const { refetch } = useCompany()
  const { mutate, isLoading } = api.companies.create.useMutation()

  const onSubmit: SubmitHandler<CompanySchema> = data =>
    mutate(data, {
      onSuccess: () => {
        refetch()
      },
    })

  return (
    <Grid w="full" minH="100vh" placeItems="center">
      <VStack
        w="full"
        maxW="480px"
        spacing={6}
        borderWidth={1}
        p={6}
        rounded="sm"
      >
        <Box w="full" textAlign="center">
          <Heading fontSize="4xl">Crie sua loja</Heading>
          <Text mt={2}>
            Você precisar criar sua loja antes de continuar a usar a plataforma.
          </Text>
        </Box>
        <chakra.form w="full" onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <Field
              label="Nome Fantasia"
              isInvalid={Boolean(errors.tradeName)}
              error={errors.tradeName?.message}
              {...register('tradeName')}
            />
            <Field
              label="Razão Social"
              isInvalid={Boolean(errors.companyName)}
              error={errors.companyName?.message}
              {...register('companyName')}
            />
            <Field
              label="CNPJ"
              isInvalid={Boolean(errors.cnpj)}
              error={errors.cnpj?.message}
              mask="99.999.999/9999-99"
              {...register('cnpj')}
            />
            <Field
              label="Website"
              isInvalid={Boolean(errors.website)}
              error={errors.website?.message}
              {...register('website')}
            />
          </VStack>
          <Button
            type="submit"
            w="full"
            mt={6}
            isDisabled={!isValid || isLoading}
            isLoading={isLoading}
          >
            Criar Loja
          </Button>
        </chakra.form>
        <Button
          size="sm"
          w="full"
          colorScheme="red"
          variant="ghost"
          onClick={() => signOut()}
        >
          Sair
        </Button>
      </VStack>
    </Grid>
  )
}
