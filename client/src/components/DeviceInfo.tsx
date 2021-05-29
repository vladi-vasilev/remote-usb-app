import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: '15px',
    flex: '1'
  },
}));

const DeviceInfo = ({device}: {device: any}) => {
    console.log(device);
    const classes = useStyles();

    if (!device) {
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
                    <ListItemText primary={`Device Name: ${device.deviceName}`} />
                </ListItem>
                <ListItem button>
                    <ListItemText primary={`Manufacturer: ${device.manufacturer}`} />
                </ListItem>
            </List>
            <Divider />
            <List component="nav" aria-label="secondary mailbox folders">
                <ListItem button>
                    <ListItemText primary={`Vendor ID: ${device.vendorId}`} />
                </ListItem>
                <ListItem button>
                    <ListItemText primary={`Product ID: ${device.productId}`} />
                </ListItem>
                <ListItem button>
                    <ListItemText primary={`Device Address: ${device.deviceAddress}`} />
                </ListItem>
            </List>
        </div>
    );
}

export default DeviceInfo;