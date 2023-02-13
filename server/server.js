require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const server = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(server);


//const CLOUDINARY_URL="cloudinary://271213257271594:rKzYCCr0BEDQQYYiIYXpnC1W5Aw@dh66s37ae";

const PORT = process.env.PORT || 5000;

const authentication = require('./Routes/authentication.js');
const channels = require('./Routes/channels.js');
const messages = require('./Routes/messages.js');

app.use(bodyParser.json({limit: '150mb'}));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
limit: '150mb',
extended: false
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
app.use(express.static(path.resolve(__dirname, '../build')));

const checkSession = (req, res, next) => {
    if(req.session && req.session.user){
        next();
    }
    else {
        res.status(401).json({message: 'Unauthorized'})
    }
}

app.use('/api', authentication);
app.use('/api', checkSession, channels);
app.use('/api', checkSession, messages);

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../build/index.html'));
// })

io.on('connection', (socket) => {
    console.log('New client connection');

    socket.on('join', props => {
        console.log('Client joined room: ' + props.channel);
        socket.join(props.channel);

        socket.user = props.userInfo;
        const activeSockets = io.sockets.adapter.rooms.get(props.channel);

        const usernames = [];
        for(const clientSocket of activeSockets){
            usernames.push(io.sockets.sockets.get(clientSocket).user.username);
        }
        
        socket.emit('active_users', usernames);
    })

    socket.on('message', messageInfo => {
        io.sockets.in(messageInfo.channel_id).emit('chat', messageInfo)
    })

    socket.on('disconnecting', () => {
        console.log('disconnected')
    })
})



server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));