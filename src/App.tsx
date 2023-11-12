import React from 'react';
import './App.css';
import Counter from './components/Counter/Counter';

function App() {
  return (
    <div className="App">
      <Counter initialValue={4} />
    </div>
  );
}

export default App;
