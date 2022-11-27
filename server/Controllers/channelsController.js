const db = require('../Database/users.js');
const cloudinary = require('../Database/cloud.js');

exports.addChannel = async (req, res) => {
    const {id, name, icon, creator} = req.body;
    let path;

    cloudinary.uploader
    .upload(icon,  { use_filename: true, responsive_breakpoints: { create_derived: true, bytes_step: 20000, min_width: 200, max_width: 1000 }}, function(error, result) {console.log(result, error); })
    .then(response => {
        path = response.etag;

        db.promise().query(`INSERT INTO channels (id, Channel_name, Channel_path) VALUES (${id}, "${name}", "${path}")`)
        .catch(err => {
            console.log(err);
            res.send(err);
        })

        db.promise().query(`INSERT INTO user_channels (user_id, channel_id) VALUES (${creator}, ${id})`)
        .catch(err => {
            console.log(err);
            res.send(err);
        })

        res.status(200).end();
    });

}

exports.loadChannels = async (req, res) => {
    const user = req.query.userID;
    const channels = [];

    const channelIDs = await db.promise().query(`SELECT channel_id FROM user_channels WHERE user_id = ${user}`);

    Promise.all(channelIDs[0].map(async el => {
        return await db.promise().query(`SELECT * FROM channels WHERE id = ${el.channel_id}`)

    })).then(values => {
        values.forEach(el => {
            channels.push(el[0][0]);
        });

        channels.forEach(el => {
            el.Channel_path = cloudinary.url(el.Channel_path);
            el.active = false;
        });

        res.send(channels);
    });
}

exports.deleteChannel = (req, res) => {
    const deleteID = req.params.id;
    console.log(deleteID);

    db.promise().query(`DELETE FROM user_channels WHERE channel_id=${deleteID}`);
    db.promise().query(`DELETE FROM channels WHERE id=${deleteID}`)
    .then(result => console.log('deleted'))
    .catch(err => console.log(err));
}