const express = require('express');
const bodyParser = require('body-parser');
const app = express();


//const CLOUDINARY_URL="cloudinary://271213257271594:rKzYCCr0BEDQQYYiIYXpnC1W5Aw@dh66s37ae";

const PORT = process.env.PORT || 5000;

const authentication = require('./Routes/authentication.js');
const channels = require('./Routes/channels.js');
const users = require('./Routes/users.js');

app.use(bodyParser.json({limit: '150mb'}));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
limit: '150mb',
extended: true
})); 


app.use('/', authentication);
app.use('/', channels);
app.use('/', users);


app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));