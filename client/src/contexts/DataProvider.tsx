import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useSocket } from './SocketProvider';
import { DeficeInfo } from './DeviceInfoProvider';

interface DataContextProps {
    data: {
        [key: number]: Array<DeficeInfo>
    };
    [key: number]: any;
}

const DataContext = React.createContext({} as DataContextProps);

export const useData = () => {
    return useContext(DataContext);
}

export const DataProvider = ({ children }: any) => {
    const [data, setData]: [any[] | any, Function] = useState();
    const socket = useSocket();

    const receiveMessage = useCallback(({devices}) => {
        setData(devices);
    }, [setData]);

    useEffect(() => {
        if (socket == null) return;
    
        socket.on('receive-message', receiveMessage);
    
        return () => socket.off('receive-message');
    }, [socket, receiveMessage]);

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    )
};