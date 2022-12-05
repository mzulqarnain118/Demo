
const databaseInfo = require('../Database/DatabaseInfo');
const minutes = 60000;

module.exports = (session) => {

    const mysqlStore = require('express-mysql-session')(session);
    return new mysqlStore({
        database: databaseInfo.databaseName,
        host: databaseInfo.host,
        port: databaseInfo.port,
        user: databaseInfo.user,
        password: databaseInfo.password,
        checkExpirationInterval: 1440 * minutes,
        expiration: 1440 * minutes,
        createDatabaseTable: true,
        clearExpired: true,
    });

}
