import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Counter from './Counter'

describe(Counter, () => {
  it('counter mounted', () => {
    const { getByTestId } = render(<Counter initialValue={0} />)
    const counter = getByTestId('Counter').textContent
    expect(counter).toBeDefined()
  })

  it('initial value is prime', () => {
    const { getByTestId } = render(<Counter initialValue={2} />)
    const counter = getByTestId('counter-box').textContent
    const primeValidationText = getByTestId('Counter').textContent

    expect(primeValidationText).toContain('is a prime!')
    expect(counter).toBe('2')
  })

  it('initial value is not prime', () => {
    const { getByTestId } = render(<Counter initialValue={4} />)
    const counter = getByTestId('counter-box').textContent
    const primeValidationText = getByTestId('Counter').textContent

    expect(primeValidationText).toContain('is not prime!')
    expect(counter).toBe('4')
  })

  it('investigate 0 exception', () => {
    const { getByTestId } = render(<Counter initialValue={0} />)
    const counter = getByTestId('counter-box').textContent
    const primeValidationText = getByTestId('Counter').textContent

    expect(primeValidationText).toContain('is not prime!')
    expect(counter).toBe('0')
  })

  it('investigate 1 exception', () => {
    const { getByTestId } = render(<Counter initialValue={1} />)
    const counter = getByTestId('counter-box').textContent
    const primeValidationText = getByTestId('Counter').textContent

    expect(primeValidationText).toContain('is not prime!')
    expect(counter).toBe('1')
  })

  it('investigate negative exception', () => {
    const { getByTestId } = render(<Counter initialValue={-1} />)
    const counter = getByTestId('counter-box').textContent
    const primeValidationText = getByTestId('Counter').textContent

    expect(primeValidationText).toContain('is not prime!')
    expect(counter).toBe('-1')
  })

  it('increase counter by button', () => {
    const { getByTestId } = render(<Counter initialValue={0} />)
    const increaseButton = getByTestId('counter-increase')
    const counterInitialValue = getByTestId('counter-box').textContent
    fireEvent.click(increaseButton)
    const counterIncreasedValue = getByTestId('counter-box').textContent

    expect(counterInitialValue).toBe('0')
    expect(counterIncreasedValue).toBe('1')
  })

  it('decrease button by button', () => {
    const { getByTestId } = render(<Counter initialValue={1} />)
    const decreaseButton = getByTestId('counter-decrease')
    const counterInitialValue = getByTestId('counter-box').textContent
    fireEvent.click(decreaseButton)
    const counterDecreasedValue = getByTestId('counter-box').textContent

    expect(counterInitialValue).toBe('1')
    expect(counterDecreasedValue).toBe('0')
  })
})
