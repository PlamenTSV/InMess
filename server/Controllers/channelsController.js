const db = require('../Database/users.js');
const cloudinary = require('../Database/cloud.js');

exports.addChannel = async (req, res) => {
    const {id, name, icon} = req.body;
    let path;

    cloudinary.uploader
    .upload(icon,  { use_filename: true, responsive_breakpoints: { create_derived: true, bytes_step: 20000, min_width: 200, max_width: 1000 }}, function(error, result) {console.log(result, error); })
    .then(response => {
        path = response.etag;

        db.promise().query(`INSERT INTO channels (id, Channel_name, Channel_path) VALUES ("${id}", "${name}", "${path}")`)
        .then(() => {
            console.log("new channel");
            res.status(200).end();
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
    });

}