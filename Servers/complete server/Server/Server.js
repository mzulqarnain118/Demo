
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const serverInfo = require('./Info/ServerInfo');
const session = require('./Session/Session');
const cors = require('./Cors/Cors');
const Middleware = require('./Middleware/Middleware');
const routes = require('./Routes/Routes');

const app = express();

const Server = async () => {


    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use(session);
    app.use(cors);
    // app.use(Middleware.public);
    app.use(Middleware.private);
    // app.use(routes.public);
    app.use(routes.private);

    app.use(express.static(path.join(__dirname, '../build')));
    app.use('*', (req, res) => res.sendFile(path.join(__dirname, '../build', 'index.html')));

    app.listen(serverInfo.port, () => {

        console.log(`Server Is Running At Port ${serverInfo.port}`);

    });

}

module.exports.start = Server;
