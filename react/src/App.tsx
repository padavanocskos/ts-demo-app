import React from 'react'
import type { FC } from 'react'
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Counter from './components/Counter/Counter'

const App: FC = () => {
  return (
    <div className="App" data-testid="App">
      <Counter initialValue={4} />
    </div>
  )
}

export default App
