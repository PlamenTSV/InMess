const db = require('../Database/users.js');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
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
}

exports.loginUser = async (req, res) => {
    if(Object.keys(req.body).length !== 0){
        console.log('Logged in: ', req.body);

        let dbData;
        let authenticated = false;
        const {username, password} = req.body;

        db.promise().query(`SELECT Password FROM users WHERE Username='${username}'`)
        .then((results, fields) => {
            dbData = results[0];
            if(Object.keys(dbData).length === 0){
                console.log('No user with such username');
            }
            else {
                dbData.filter(element => {
                    if(bcrypt.compareSync(password, element.Password)){
                        console.log('true');
                        authenticated = true;
                    } else {
                        console.log('Wrong password');
                    }
                });
            }
        })
        .finally(() => {
            res.send((authenticated) ? 'Login successful' : 'Incorrect username or password');
        })
    }
}