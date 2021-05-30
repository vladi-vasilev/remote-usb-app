import React, { useContext, useState } from 'react';

export interface DeficeInfo {
    deviceName: string;
    manufacturer: string;
    vendorId: number;
    productId: number;
    deviceAddress: number;
}

export interface DeviceInfoContextProps {
    deviceInfo: DeficeInfo;
    setDeviceOnView: Function;
}

const DeviceInfoContext = React.createContext({} as DeviceInfoContextProps);

export const useDeviceInfo = () => {
    return useContext(DeviceInfoContext);
}

export const DeviceInfoProvider = ({ children }: any) => {
    const [deviceInfo, setDeviceOnView]: [any | any, Function] = useState();

    return (
        <DeviceInfoContext.Provider value={{deviceInfo, setDeviceOnView}}>
            {children}
        </DeviceInfoContext.Provider>
    )
};