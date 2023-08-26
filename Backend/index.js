const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const dotenv = require('dotenv');
dotenv.config({ path: ".env" });
const mongoDB = require('./db');
const cors = require('cors');

mongoDB();

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});
app.use(cors());
app.use(express.json());
app.use('/', require('./Routes/CreateGame'));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
