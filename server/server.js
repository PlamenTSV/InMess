require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();


//const CLOUDINARY_URL="cloudinary://271213257271594:rKzYCCr0BEDQQYYiIYXpnC1W5Aw@dh66s37ae";

const PORT = process.env.PORT || 5000;

const authentication = require('./Routes/authentication.js');
const channels = require('./Routes/channels.js');

app.use(bodyParser.json({limit: '150mb'}));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
limit: '150mb',
extended: true
}));

app.use(cookieParser());

app.use(session({
    key: 'user',
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24 * 1000 //1 day expiration
    }
}))

app.use('/', authentication);
app.use('/', channels);


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));