import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import usbDetect from 'usb-detection';

const app: Application = express();

const PORT: Number = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json());

usbDetect.startMonitoring();

app.get('/usb/devices', (req: Request, res: Response) => {
    usbDetect.find()
        .then((devices) => { 
            // console.log(devices);
            res.send(devices);
        }).catch((err) => { 
            // console.log(err);
            res.send(err);
        });
});

app.listen(PORT, () => {
    console.log(`Server started, listening at http://localhost:${PORT}`);
});
