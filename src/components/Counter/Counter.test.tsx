import React from 'react';
import { render, screen } from '@testing-library/react'
import Counter from './Counter';
// import { getByTestId } from '@testing-library/react';

describe(Counter, () => {
  it("counter mounted", () => {
    const { getByTestId } = render(<Counter initialValue={3} />);
    const counter = getByTestId("Counter").textContent;
    expect(counter).toBeDefined
  });
});