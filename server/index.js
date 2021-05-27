const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send({ msg: 'Hello World' });
})

app.listen(PORT, () => {
    console.log(`Server started, listening at http://localhost:${PORT}`);
});

