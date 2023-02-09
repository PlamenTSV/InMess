const db = require('../Database/users.js');
const cloudinary = require('../Database/cloud.js');

exports.addMessage = async (req, res) => {
    const {senderID, content, sent_at, channel_id} = req.body;

    db.promise().query(`INSERT INTO messages (senderID, content, sent_at, channel_id) VALUES (${senderID}, "${content}", "${sent_at}", ${channel_id})`)
    .catch(err => console.log(err))

    const username = await db.promise().query(`SELECT Username FROM users WHERE id=${senderID}`);
    const icon = await db.promise().query(`SELECT Profile_icon FROM users WHERE id=${senderID}`);

    res.status(200).send({username: username[0][0].Username, icon: cloudinary.url('profile-pictures/' + icon[0][0].Profile_icon)});
}

exports.loadMessages = async (req, res) => {
    const activeChannel = req.params.activeChannel;
    const responseArr = [];

    const messagesSenderIDs = await db.promise().query(`SELECT senderID FROM messages WHERE channel_id=${activeChannel}`);
    const messagesRaw = await db.promise().query(`SELECT content, sent_at, channel_id FROM messages WHERE channel_id=${activeChannel}`);
    const messages = messagesRaw[0];

    Promise.all(messagesSenderIDs[0].map(async mess => {
        return await db.promise().query(`SELECT Username, Profile_icon FROM users WHERE id=${mess.senderID}`);
    })).then(values => {
        values.forEach((value, index) => {
            responseArr.push({
                senderIcon: cloudinary.url('profile-pictures/' + value[0][0].Profile_icon),
                senderUsername: value[0][0].Username,
                content: messages[index].content,
                sent_at: messages[index].sent_at,
                channel_id: messages[index].channel_id
            });
        })
        res.send(responseArr);
    })
}