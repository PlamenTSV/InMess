const db = require('../Database/users.js');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
    const {username, password, email} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const results = await db.promise().query(`INSERT INTO users (Username, Password, Email) VALUES ("${username}", "${hashedPassword}", "${email}")`);
        const id = results[0].insertId;

        req.session.user = {
            id: id,
            username: username,
            email: email
        }
        console.log(req.session.user);
        res.status(200).send({message: 'Success'});
    } catch (e) {
        console.log(err);
        res.send({message: 'Email already in use'});
    }
}

exports.loginUser = async (req, res) => {
    const {username, password} = req.body;

    const dbData2 = await db.promise().query(`SELECT id, Email, Password FROM users WHERE Username='${username}'`)
    const matchingUsers = dbData2[0];

    if(matchingUsers.length === 0)res.send({message: 'No such user found!'});

    else matchingUsers.forEach(user => {
        if(bcrypt.compareSync(password, user.Password)){
            req.session.user = {
                id: user.id,
                username: username,
                email: user.Email
            }
            res.status(200).send({message: 'Success'})
        } else res.send({message: 'Wrong password'});
    })
}

exports.userHasSession = (req, res) => {
    res.send({isLogged: req.session.user? true : false});
}