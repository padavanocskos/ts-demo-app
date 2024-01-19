import { HttpResponse, http } from 'msw'

// These request handlers focus on the endpoints
// that concern the user.
export const handlers = [
  http.get('/user', () => {
    return HttpResponse.json({ name: 'John Maverick' })
  }),
  // http.get('/user', getUserResolver),
  http.post('/login', () => {
    return HttpResponse.json({ status: 'ok', messager: "Login was successfull" })
  })
  // http.delete('/user/:userId', deleteUserResolver)
]
