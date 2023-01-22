const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dh66s37ae',
    api_key: '271213257271594',
    api_secret: 'rKzYCCr0BEDQQYYiIYXpnC1W5Aw',
    secure: true
});

module.exports = cloudinary;