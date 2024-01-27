import React, { useEffect } from 'react'
import type { FC } from 'react'
import { isPrime } from '../../utils/util'
// import fetch from 'node-fetch'
import axios from 'axios'
import { Button } from '@mui/material'

// fetch.Promise = Promise;

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

  useEffect(() => {
    axios.get('http://localhost:8000/user').then(res => {
      console.log(res)
    }).catch(e => {
      console.log(e.message)
    })
  //   fetch('http://localhost:8000/user')
  //     .then(async (res) => await res.json())
  //     .catch((error) => { console.log(error) })
  //   fetch('http://localhost:8000/login', {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({ name: 'kakszi', pass: 'almafa'})
  //   }).then(async (res) => await res.json())
  //     .catch((error) => { console.log(error) })
  }, [])

  return (
    <div data-testid="Counter">
      <p>Initial value is <span id="prime-span">{ isPrime(initialValue) ? 'a' : 'not' }</span> prime!</p>
      <Button data-testid="counter-increase" onClick={handleIncrement}>+</Button>
      <Button data-testid="counter-decrease" onClick={handleDecrement}>-</Button>
      <p>Counter Component: <span data-testid="counter-box">{counter}</span></p>
    </div>
  )
}

export default Counter
