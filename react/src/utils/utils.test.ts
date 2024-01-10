import { isPrime } from './util'

describe('Test utils prime validation', () => {
  it('if initialize with 0', () => {
    const prime = isPrime(0)
    expect(prime).toBeFalsy()
  })

  it('if initialize with negative', () => {
    const prime = isPrime(-1)
    expect(prime).toBeFalsy()
  })

  it('if initialize with 1', () => {
    const prime = isPrime(1)
    expect(prime).toBeFalsy()
  })

  it('if initialize with 5', () => {
    const prime = isPrime(5)
    expect(prime).toBeTruthy()
  })
})
