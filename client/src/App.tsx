import React, { useState, useEffect, useCallback } from 'react';
import { useSocket } from './contexts/SocketProvider';
import './App.css';

const App = () => {
  const [data, setData] = useState(null);
  const socket = useSocket();

  const receiveMessage = useCallback(({text, device, devices}) => {
      setData(devices);
      console.log(text, device, devices);
  }, [setData]);

  const sendMessage = () => socket.emit('send-message', { text: 'ping' });

  useEffect(() => {
    if (socket == null) return

    socket.on('receive-message', receiveMessage);

    return () => socket.off('receive-message')
  }, [socket, receiveMessage]);

  return (
    <>
      <button onClick={sendMessage}>Send socket event</button>
      <pre>
        {JSON.stringify(data, null, 4)}
      </pre>
    </>
  );
}

export default App;
