import React, { FC } from 'react';
import { isPrime } from '../../utils/util';


interface CounterProps {
  initialValue: number,
}

const Counter: FC<CounterProps> = ({initialValue}: CounterProps) => {
  const [counter, setCounter] = React.useState<number>(initialValue);

  const handleIncrement = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const handleDecrement = () => {
    setCounter((prevCounter) => prevCounter - 1);
  }
  
  return (
    <div data-testid="Counter">
      Initial value is { isPrime(initialValue) ? 'a ' : 'is not '} prime!
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
      Counter Component: {counter}
    </div>
  )
};

export default Counter;
