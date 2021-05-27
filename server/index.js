const express = require('express');
const cors = require('cors');
const usb = require('usb');
const app = express();

const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/usb/devices', (req, res) => {
    // console.log(usb.getDeviceList());
    res.send(usb.getDeviceList());
});

app.listen(PORT, () => {
    console.log(`Server started, listening at http://localhost:${PORT}`);
});

