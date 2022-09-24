const express = require('express');
const app = express();

const db = require('./Database/users.js');

app.use(express.json());

app.post('/register', (req, res) => {
    if(Object.keys(req.body).length !== 0){
        const {username, password, email} = req.body;
        console.log('Registered: ', req.body);
        res.json(req.body);
        db.promise().query(`INSERT INTO users (Username, Password, Email) VALUES ("${username}", "${password}", "${email}")`);
        db.promise().query('SELECT * FROM users')
        .then((results, fields) => console.log('Database: ', results[0]));
    }
});

app.post('/login', (req, res) => {
    if(Object.keys(req.body).length !== 0){
        console.log('Logged in: ', req.body);
        res.json(req.body);
        db.promise().query('SELECT * FROM users')
        .then((results, fields) => console.log('Database: ', results[0]));
    }
});

app.listen(5000, () => console.log('started'));