const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

const db = require('./Database/users.js');
const bcrypt = require('bcrypt');

app.use(express.json());

app.post('/register', async (req, res) => {
    if(Object.keys(req.body).length !== 0){
        const {username, password, email} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        
        db.promise().query(`INSERT INTO users (Username, Password, Email) VALUES ("${username}", "${hashedPassword}", "${email}")`)
        .then(() => {
            console.log('new entry');
            res.status(200).end();
        })
        .catch(err => {
            console.log('Email is already in use!');
            res.send('Email already in use');
        });
    }
});

app.post('/login', async (req, res) => {
    if(Object.keys(req.body).length !== 0){
        console.log('Logged in: ', req.body);

        let dbData;
        const {username, password} = req.body;

        db.promise().query(`SELECT Password FROM users WHERE Username='${username}'`)
        .then((results, fields) => {
            dbData = results[0];

            dbData.filter(element => {
                if(bcrypt.compareSync(password, element.Password))console.log(element, 'true');
            });
        });
        
    }
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));