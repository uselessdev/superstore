import { intlFormatDistance } from 'date-fns'

export function relativeDates(date: Date | number) {
  return intlFormatDistance(date, new Date(), {
    locale: 'pt-BR',
  })
}
