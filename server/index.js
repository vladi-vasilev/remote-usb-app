const express = require('express');
const cors = require('cors');
const usbDetect = require('usb-detection');
const app = express();

const PORT = 3001;

app.use(cors());
app.use(express.json());


usbDetect.startMonitoring();

app.get('/usb/devices', (req, res) => {
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

