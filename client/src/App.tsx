import React, { useState, useEffect, useCallback } from 'react';
import { useSocket } from './contexts/SocketProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tree from './components/Tree';
import DeviceInfo from './components/DeviceInfo';
import './App.css';

const App = () => {
  const [data, setData]: [any[] | any, Function] = useState();
  const [device, setDeviceOnView]: [any | any, Function] = useState();
  const socket = useSocket();


  const receiveMessage = useCallback(({text, device, devices}) => {
      setData(devices);
      console.log(text, device, devices);
  }, [setData]);

  // const sendMessage = () => socket.emit('send-message', { text: 'ping' });

  useEffect(() => {
    if (socket == null) return;

    socket.on('receive-message', receiveMessage);

    return () => socket.off('receive-message');
  }, [socket, receiveMessage]);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <div className="app-conatiner">
          {!data
            ? <CircularProgress color="secondary" />
            : <>
              <Tree data={data} setDeviceOnView={setDeviceOnView} />
              <DeviceInfo device={device} />
            </>
          }
        </div>
      </Container>
    </>
  );
}

export default App;
