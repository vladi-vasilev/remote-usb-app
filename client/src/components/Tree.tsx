import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { useData } from '../contexts/DataProvider';
import { useDeviceInfo, DeficeInfo } from '../contexts/DeviceInfoProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 400,
    paddingTop: '15px',
    backgroundColor: theme.palette.background.paper
  },
}));

const Tree = () => {
    const data = useData();
    const { setDeviceOnView } = useDeviceInfo();
    const classes = useStyles();

    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {data && Object.keys(data).map((key: any) => (
                <TreeItem nodeId={String(key)} label={`Hub: ${key}`} key={key}>
                    {data[key].map((el: DeficeInfo) => (
                        <TreeItem nodeId={String(el.deviceAddress)} label={el.deviceName} key={el.deviceAddress} onClick={() => setDeviceOnView(el)} />
                    ))}
                </TreeItem>
            ))}
        </TreeView>
    );
};

export default Tree;