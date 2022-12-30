const db = require('../Database/users.js')

exports.newMessage = (socket) => {
    socket.on('message', data => {
        db.promise().query(`INSERT INTO messages (senderID, content, sent_at, channel_id) VALUES (${data.senderID}, "${data.content}", "${data.sent_at}", ${data.channel_id})`)
        .catch(err => console.log(err))

        db.promise().query(`SELECT Username FROM users WHERE id=${data.senderID}`)
        .then(username => {
            socket.emit('receivedMessage', {content: data.content, senderID: username[0][0].Username});
        })
    })
}

exports.loadMessages = (socket) => {
    socket.on('loadMessages', async params => {
        const messagesQuery = await db.promise().query(`SELECT * FROM messages WHERE channel_id=${params.channel}`);
        const messages = messagesQuery[0];

        socket.emit('messagesForCurrentChannel', messages);
    })
}