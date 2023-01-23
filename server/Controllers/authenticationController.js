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

    const dbData = await db.promise().query(`SELECT id, Email, Password FROM users WHERE Username='${username}'`)
    const matchingUsers = dbData[0];

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

exports.logoutUser = (req, res) => {
    if(req.session){
        req.session.destroy(err => {
            if(err)res.status(400).send('Unable to logout');
            else res.send('Logout successful')
        })
    } else {
        res.end();
    }
}

exports.userHasSession = (req, res) => {
    res.send(req.session.user? {isLogged: true, user: req.session.user} : {isLogged: false});
}