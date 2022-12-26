import './style.scss';
import React from 'react';

export function App() {
  const [testState, setState] = React.useState('hello');
  return <div>
    <button onClick={() => setState('one')}>Button 1</button>
    <button onClick={() => setState('two')}>Button 2</button>
    {testState}
  </div>;
}
