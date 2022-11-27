const db = require('../Database/users');
const bcrypt = require('bcrypt');

exports.loadCredentials = (req, res) => {
    const userID = req.query.userID;

    db.promise().query(`SELECT * FROM users WHERE id = ${userID}`)
    .then(data => {
        res.send(data[0][0]);
    })
    .catch(err => console.log(err));
}