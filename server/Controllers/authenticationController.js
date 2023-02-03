const db = require('../Database/users.js');
const bcrypt = require('bcryptjs');
const cloudinary = require('../Database/cloud.js');

exports.registerUser = async (req, res) => {
    const {username, password, email} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const results = await db.promise().query(`INSERT INTO users (Username, Password, Email, Profile_icon) VALUES ("${username}", "${hashedPassword}", "${email}", "UserIcon_kj33jy")`);
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
    req.session.destroy(err => {
        if(err)res.status(400).send('Unable to logout');
        else res.send('Logout successful')
    })
}

exports.updateUser = async (req, res) => {
    const {newUsername, newEmail} = req.body;
    
    await db.promise().query(`UPDATE users SET Username="${newUsername}", Email="${newEmail}" WHERE id=${req.session.user.id}`)
    
    req.session.user = {
        id: req.session.user.id,
        username: newUsername,
        email: newEmail
    }
    
    res.send({isLogged: true, user: req.session.user});
}

exports.getProfileIcon = async (req, res) => {
    if(req.session && req.session.user){
        const userID = req.session.user.id;

        const fileQuery = await db.promise().query(`SELECT Profile_icon FROM users WHERE id = ${userID}`);
        const fileName = fileQuery[0][0].Profile_icon;
        console.log(fileName);

        const image = cloudinary.url('profile-pictures/' + fileName);
        res.send(image);
    } else res.status(401).json({message: 'Unauthorized'});
}

exports.getSession = (req, res) => {
    if(req.session && req.session.user)res.send({message: 'Authorized', user: req.session.user});
    else res.json({message: 'Unauthorized'});
}