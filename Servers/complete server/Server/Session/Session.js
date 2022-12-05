
const session = require('express-session');
const uuid = require('uuid');

const serverInfo = require('../Info/ServerInfo');
const sessionStore = require('./SessionStore');

module.exports = session({

    name: serverInfo.sessionName,
    secret: serverInfo.sessionKey,
    resave: false,
    saveUninitialized: false,
    store: sessionStore(session),
    cookie: {
        sameSite: false,
        httpOnly: true,
        secure: false,
    },
    genid: (req) => uuid.v4()

});
