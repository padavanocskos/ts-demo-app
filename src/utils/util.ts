export const isPrime = (number: number): boolean => {
  let isPrime: boolean = true;

  if (number === 1) {
    isPrime = false;
  } else {
    for (let i = 2; i < number; i++) {
      if (number % i === 0) {
        isPrime = false;
        break;
      }
    }
  }

  return isPrime;
};
