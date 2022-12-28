const db = require('../Database/users.js')

module.exports = function(socket){
    socket.on('message', async data => {
        console.log(`New message from ${data.sender}: ${data.message}`);
        console.log(`Sent on ${data.sentAt} in channel with id ${data.channel}`);
        console.log('--------------------');

        db.promise().query(`INSERT INTO messages (senderID, content, sent_at, channel_id) VALUES (${data.sender}, "${data.message}", "${data.sentAt}", ${data.channel})`)
        .catch(err => console.log(err))

        db.promise().query(`SELECT Username FROM users WHERE id=${data.sender}`)
        .then(username => {
            socket.emit('receivedMessage', {text: data.message, sender: username[0][0].Username});
        })
    })
}