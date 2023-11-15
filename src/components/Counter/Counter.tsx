import React from 'react'
import type { FC } from 'react'
import { isPrime } from '../../utils/util'

interface CounterProps {
  initialValue: number
}

const Counter: FC<CounterProps> = ({ initialValue }: CounterProps) => {
  const [counter, setCounter] = React.useState<number>(initialValue)

  const handleIncrement = (): void => {
    setCounter((prevCounter) => prevCounter + 1)
  }

  const handleDecrement = (): void => {
    setCounter((prevCounter) => prevCounter - 1)
  }

  return (
    <div data-testid="Counter">
      <p>Initial value is <span id="prime-span" >{ isPrime(initialValue) ? 'a' : 'not'}</span> prime!</p>
      <button data-testid="counter-increase" onClick={handleIncrement}>+</button>
      <button data-testid="counter-decrease" onClick={handleDecrement}>-</button>
      <p>Counter Component: <span data-testid="counter-box">{counter}</span></p>
    </div>
  )
}

export default Counter
