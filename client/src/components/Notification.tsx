import React, { useEffect, useCallback, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useSocket } from '../contexts/SocketProvider';
import { DeficeInfo } from '../contexts/DeviceInfoProvider';

const Notification = () => {
  const [deviceInfo, setDeviceNote]: [DeficeInfo | undefined, Function] = useState();
  const [isDeviceMounted, setDeviceMountedInfo]: [boolean, Function] = useState(false);
  const [notificationIsOpen, setNotification]: [boolean, Function] = React.useState(false);
  const socket = useSocket();

  const dispatchNotification = useCallback(({device, isDeviceMounting}) => {
    if (device) {
      setNotification(true);
      setDeviceNote(device);
      setDeviceMountedInfo(isDeviceMounting);
    }
  }, []);

  useEffect(() => {
    if (socket == null) return;
    socket.on('receive-message', dispatchNotification);

    return () => socket.off('receive-message');
  }, [socket, dispatchNotification]);

  const handleClose: Function = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotification(false);
  };

  const notficationMessage = deviceInfo
          ? (isDeviceMounted ? `${deviceInfo.deviceName} was mounted.` : `${deviceInfo.deviceName} was unmounted.`)
          : 'Error';

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={notificationIsOpen}
        autoHideDuration={6000}
        onClose={() => handleClose()}
        message={notficationMessage}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => handleClose()}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}

export default Notification;