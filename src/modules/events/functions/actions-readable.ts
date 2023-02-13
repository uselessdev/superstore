import type { Events } from '@/events'

export function getActionReadable(action: Events) {
  return {
    CREATE_COMPANY: `criou a loja`,
  }[action]
}
