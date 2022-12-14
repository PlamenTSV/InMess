require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


//const CLOUDINARY_URL="cloudinary://271213257271594:rKzYCCr0BEDQQYYiIYXpnC1W5Aw@dh66s37ae";

const PORT = process.env.PORT || 5000;

const authentication = require('./Routes/authentication.js');
const channels = require('./Routes/channels.js');
const messages = require('./Routes/messages.js');

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
app.use('/', messages);

io.on('connection', (socket) => {
    console.log('new client connection');

    socket.on('join', room => {
        console.log('Client joined room: ' + room);
        socket.join(room);
    })

    socket.on('message', messageInfo => {
        console.log('New message in channel: ' + messageInfo.channel_id);
        io.sockets.in(messageInfo.channel_id).emit('chat', messageInfo)
    })

    socket.on('disconnecting', () => console.log('disconnected'))
})



server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));