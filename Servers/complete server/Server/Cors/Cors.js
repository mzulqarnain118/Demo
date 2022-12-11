
const cors = require('cors');

const whitelist = {
    'http://localhost:3000': 'private',

};

const corsOptions = (req, callback) => {
    options = {
        origin: (origin, callback) => {
            if (whitelist[origin] || !origin) {
                // if (whitelist[origin]) {
                callback(null, true);
            } else
                callback('UnAuthorized!');

        },
        methods: ['POST', 'GET', 'PUT', 'DELETE'],
        credentials: true
    }

    if (whitelist[req.get('origin')])
        req.access = whitelist[req.get('origin')];
    else if (!req.get('origin')) {
        req.access = 'private';
        req.headers.origin = req.protocol + '://' + req.get('host');
    } else
        req.access = 'public';
    callback(null, options);
}

module.exports = cors(corsOptions);
