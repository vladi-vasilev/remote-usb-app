import React, { useState, useEffect, useCallback } from 'react';
import { useSocket } from './contexts/SocketProvider';
import './App.css';

const App = () => {
  const [data, setData]: [any[] | any, Function] = useState();
  const socket = useSocket();

  const receiveMessage = useCallback(({text, device, devices}) => {
      setData(devices);
      console.log(text, device, devices);
  }, [setData]);

  const sendMessage = () => socket.emit('send-message', { text: 'ping' });

  useEffect(() => {
    if (socket == null) return;

    socket.on('receive-message', receiveMessage);

    return () => socket.off('receive-message');
  }, [socket, receiveMessage]);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <button onClick={sendMessage}>Send socket event</button>
      {data && Object.keys(data).map((key: any) => {
          return (
            <>
              <ul>
                <li>
                  <>
                    <p>Hub: {key}</p>
                    {data[key].map((el: any) => {
                      return (
                        <>
                          <ul>
                            <li>{el.deviceName}</li>
                            <li>{el.manufacturer}</li>
                          </ul>
                          <hr />
                        </>
                      )
                    })}
                  </>  
                </li>
              </ul>
            </>
          )
        })
      }
      
    </>
  );
}

export default App;
