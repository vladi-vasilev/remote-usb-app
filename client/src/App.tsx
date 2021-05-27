import React from 'react';
import useFetch from './customHooks/useFetch';
import './App.css';

const App = () => {
  const { data, isLoading, error } = useFetch('http://localhost:3001/usb/devices', {});

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <pre>
      {isLoading ? <p>Loading..</p> : JSON.stringify(data, null, 4)}
    </pre>
  );
}

export default App;
