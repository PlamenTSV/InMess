const express = require('express');
const app = express();

app.use(express.json());

app.post('/register', (req, res) => {
    if(Object.keys(req.body).length !== 0){
        console.log('Registered: ', req.body);
        res.json(req.body);
    }
});

app.post('/login', (req, res) => {
    if(Object.keys(req.body).length !== 0){
        console.log('Logged in: ', req.body);
        res.json(req.body);
    }
});

app.listen(5000, () => console.log('started'));