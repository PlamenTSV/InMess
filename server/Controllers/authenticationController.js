const db = require('../Database/users.js');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
    if(Object.keys(req.body).length !== 0){
        const {username, password, email} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        
        db.promise().query(`INSERT INTO users (Username, Password, Email) VALUES ("${username}", "${hashedPassword}", "${email}")`)
        .then((results, fields) => {
            console.log('New entry with id ' + results[0].insertId);
            res.status(200).send(`${results[0].insertId}`);
        })
        .catch(err => {
            console.log(err);
            res.send('Email already in use');
        });
    }
}

exports.loginUser = async (req, res) => {
    if(Object.keys(req.body).length !== 0){
        console.log('Logged in: ', req.body);

        let dbData;
        const {username, password} = req.body;

        db.promise().query(`SELECT id, Password FROM users WHERE Username='${username}'`)
        .then((results, fields) => {
            dbData = results[0];
            if(Object.keys(dbData).length === 0){
                console.log('No user with such username');
                res.send('No user with such username');
            }
            else {
                dbData.forEach(element => {
                    if(bcrypt.compareSync(password, element.Password)){
                        res.status(200).send(`${element.id}`);
                    } else {
                        res.send('Wrong password');
                    }
                });
            }
        })
    }
}