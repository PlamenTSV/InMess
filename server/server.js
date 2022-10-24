const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

const authentication = require('./Routes/authentication.js');

app.use(express.json());

app.use('/', authentication);


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));