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
        .then(() => {
            console.log("new channel");
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })

        db.promise().query(`INSERT INTO user_channels (user_id, channel_id) VALUES (${creator}, ${id})`)
        .then(() => {
            console.log(`created by user with id ${creator}`);
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })

        res.status(200).end();
    });

}

// exports.loadChannels = async (req, res) => {

// }