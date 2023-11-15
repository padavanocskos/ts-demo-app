export const isPrime = (number: number): boolean => {
  if (number === 1 || number === 0 || number < 0) {
    return false
  }

  let isPrime: boolean = true

  for (let i = 2; i < number; i++) {
    if (number % i === 0) {
      isPrime = false
      break
    }
  }

  return isPrime
}
