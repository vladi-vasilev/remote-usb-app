import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { useDeviceInfo } from '../contexts/DeviceInfoProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: '15px',
    flex: '1'
  },
}));

const DeviceInfo = () => {
    const { deviceInfo } = useDeviceInfo();
    const classes = useStyles();

    if (!deviceInfo) {
        return (
            <div className={classes.root}>
                <h1>Device Info:</h1>
                <p>Select device to get more info</p>
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <h1>Device Info:</h1>
            <List component="nav" aria-label="main mailbox folders">
                <ListItem button>
                    <ListItemText primary={`Device Name: ${deviceInfo.deviceName}`} />
                </ListItem>
                <ListItem button>
                    <ListItemText primary={`Manufacturer: ${deviceInfo.manufacturer}`} />
                </ListItem>
            </List>
            <Divider />
            <List component="nav" aria-label="secondary mailbox folders">
                <ListItem button>
                    <ListItemText primary={`Vendor ID: ${deviceInfo.vendorId}`} />
                </ListItem>
                <ListItem button>
                    <ListItemText primary={`Product ID: ${deviceInfo.productId}`} />
                </ListItem>
                <ListItem button>
                    <ListItemText primary={`Device Address: ${deviceInfo.deviceAddress}`} />
                </ListItem>
            </List>
        </div>
    );
}

export default DeviceInfo;