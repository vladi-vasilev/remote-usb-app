import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:3001/usb/devices');

        // console.log(response);

        if (response.status === 200) {
          setData(response.data);
        } else {
          setIsLoading(false);
          throw Error('Something went wrong');
        }

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? <p>Loading..</p> : <p>{JSON.stringify(data)}</p>}
    </div>
  );
}

export default App;
