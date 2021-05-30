import React from 'react';
import { useData } from './contexts/DataProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tree from './components/Tree';
import DeviceInfo from './components/DeviceInfo';
import Notification from './components/Notification';
import { DeviceInfoProvider } from './contexts/DeviceInfoProvider';
import './App.css';

const App = () => {
  const data = useData();

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <div className="app-conatiner">
          {!data
            ? <CircularProgress color="secondary" />
            : <>
              <DeviceInfoProvider>
                <Notification />
                <Tree />
                <DeviceInfo />
              </DeviceInfoProvider>
            </>
          }
        </div>
      </Container>
    </>
  );
}

export default App;
