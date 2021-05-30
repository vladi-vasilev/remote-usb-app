import express, { Application } from 'express';
import usbDetect, { Device } from 'usb-detection';
import { Server } from "socket.io";
import http from "http";

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: '*',
    }
});

const PORT: Number = Number(process.env.PORT) || 3001;

app.use(express.json());

usbDetect.startMonitoring();

const sendMessageToClient = async (socket: any, device: Device | null) => {
    try {
        const devices = await usbDetect.find();
        const isDeviceMounting = device ? devices.some((d) => d.deviceAddress === device.deviceAddress) : false;
        var formattedDevices = devices.reduce((acc: any, cur) => {
            if (!acc[cur.vendorId]) {
                acc[cur.vendorId] = [cur];
                return acc;
            }
            acc[cur.vendorId] = [...acc[cur.vendorId], cur];
            return acc;
        }, {});

        socket.emit('receive-message', {
            device,
            isDeviceMounting,
            devices: formattedDevices
        });
    } catch (err) {
        console.log(err);
    }
};

io.on('connection', (socket: any) => {
    sendMessageToClient(socket, null)
    usbDetect.on('change', (device) => sendMessageToClient(socket, device));
});

server.listen(PORT, () => {
    console.log(`Server started, listening at http://localhost:${PORT}`);
});
