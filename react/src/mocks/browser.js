import { setupWorker } from 'msw/browser'
import { userHandlers } from './handlers/user'
import { contactsHandlers } from './handlers/contacts'

const handlers = [
  ...userHandlers,
  ...contactsHandlers
]

export const worker = setupWorker(...handlers)
