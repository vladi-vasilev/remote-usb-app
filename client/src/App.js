import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      let res = await axios.get('http://localhost:3001');
      // console.log(res.data.msg);

      setData(res.data.msg);
    }

    getData();
  }, []);

  return (
    <div>
      <p>{data}</p>
    </div>
  );
}

export default App;
