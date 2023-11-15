import React from 'react'
import { render } from '@testing-library/react'
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
})
