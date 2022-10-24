const db = require('mysql2');

module.exports = db.createConnection(
    // {host: 'containers-us-west-35.railway.app',
    // user: 'root',
    // password: 'pOVPC7aMmMbRHTtp3Uxk',
    // database: 'railway',
    // port: 7310
    //---------------------------------
    // database: 'geekscord',
    // user: 'xmf7bzfr3pwo3nuqe6a5',
    // host: 'eu-central.connect.psdb.cloud',
    // password: 'pscale_pw_BRtJDGoF8eNutQt3xZ84IFpztkhW4yKLscJ9rUNzl2O',
    // rejectUnauthorized: true
    //---------------------------------}
    'mysql://xmf7bzfr3pwo3nuqe6a5:pscale_pw_BRtJDGoF8eNutQt3xZ84IFpztkhW4yKLscJ9rUNzl2O@eu-central.connect.psdb.cloud/geekscord?ssl={"rejectUnauthorized":true}'
);
