import * as React from 'react'
import type { InputProps } from '@chakra-ui/react'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import ReactMaskInput from 'react-input-mask'

type Props = InputProps & {
  label: string
  error?: string
  mask?: string
}

export const Field = React.forwardRef<HTMLInputElement, Props>(function render(
  { label, error, mask, ...props },
  inputRef
) {
  if (mask) {
    return (
      <FormControl isInvalid={Boolean(error)}>
        <FormLabel>{label}</FormLabel>
        <Input as={ReactMaskInput} mask={mask} {...props} ref={inputRef} />
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
    )
  }

  return (
    <FormControl isInvalid={Boolean(error)}>
      <FormLabel>{label}</FormLabel>
      <Input {...props} ref={inputRef} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  )
})
