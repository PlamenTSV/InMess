const db = require('../Database/users.js');
const cloudinary = require('../Database/cloud.js');

exports.addChannel = async (req, res) => {
    const {id, name, icon} = req.body;
    const creator = req.session.user.id;
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

exports.joinChannel = async (req, res) => {
    const user = req.session.user;
    const channelID = req.body.channelID;
    let message = 'Success';

    console.log(`User ${user.id} wants to join channel - ${channelID}`);

    db.query(`INSERT INTO user_channels (user_id, channel_id) VALUES (${user.id}, ${channelID})`, (err, results) => {
        if(err && err.code === 'ER_DUP_ENTRY'){
            message = 'dublicate';
        }
        res.send({message: message});
    });
}

exports.loadChannels = async (req, res) => {
    if(!req.session.user)res.send({isLogged: false});
    else{
        const user = req.session.user;
        const channels = [];

        const channelIDs = await db.promise().query(`SELECT channel_id FROM user_channels WHERE user_id = ${user.id}`);

        Promise.all(channelIDs[0].map(async el => {
            return await db.promise().query(`SELECT * FROM channels WHERE id = ${el.channel_id}`)

        })).then(values => {
            values.forEach(el => {
                channels.push(el[0][0]);
            });

            channels.forEach(el => {
                el.Channel_path = cloudinary.url(el.Channel_path);
            });

            res.send(channels);
        });
    }
}

exports.deleteChannel = (req, res) => {
    const deleteID = req.params.id;

    db.promise().query(`SELECT Channel_path FROM channels WHERE id=${deleteID}`)
    .then(image => {
        cloudinary.uploader.destroy(image[0][0].Channel_path, function(result) { console.log(result) });
    })

    db.promise().query(`DELETE FROM user_channels WHERE channel_id=${deleteID}`);
    db.promise().query(`DELETE FROM channels WHERE id=${deleteID}`)
    .catch(err => console.log(err));

    res.end();
}