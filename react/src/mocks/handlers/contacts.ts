import { HttpResponse, http, delay } from 'msw'
import { faker } from '@faker-js/faker'
import IContacts from '../../components/Partners/Contacts/IContact'

// These request handlers focus on the endpoints
// that concern the user.
const createContact = (): IContacts => {
  return {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    middleName: faker.person.middleName(),
    mobile1: faker.phone.number(),
    mobile2: faker.phone.number(),
    phone1: faker.phone.number(),
    phone2: faker.phone.number(),
    email: faker.internet.email()
  }
}

const contacts = [...new Array(100)].map(() => createContact())

export const contactsHandlers = [
  http.get('/api/v1/contacts', async ({ request }) => {
    console.log("REQUEST", request)
    const url = new URL(request.url)
    const limit = parseInt(url.searchParams.get('limit') ?? '10')
    const offset = parseInt(url.searchParams.get('offset') ?? '0')
    console.log("limit", limit)
    console.log("offset", offset)
    console.log(contacts.slice(offset, limit))

    await delay(2000)
    console.log(contacts.slice(offset, offset + limit))
    return HttpResponse.json({ rows: [ ...contacts.slice(offset, offset + limit) ], totalRows: contacts.length })
  }),
]