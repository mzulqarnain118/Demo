
const bunyan = require('bunyan');
const date = new Date();
const dateString = ((parseInt(date.getDate().toString()) < 10) ? ('0' + parseInt(date.getDate().toString())) : parseInt(date.getDate().toString())) + '-' + (((parseInt(date.getMonth().toString()) + 1) < 10) ? ('0' + (parseInt(date.getMonth().toString()) + 1)) : (parseInt(date.getMonth().toString()) + 1)) + '-' + date.getFullYear();

const serializers = {
    req: (req) => {
        return {
            ip: req.ip
        }
    }
};

const logger = bunyan.createLogger({
    name: 'logger',
    streams: [
        {
            level: 'info',
            path: `./Logs/info-${dateString}.log`
        },
        {
            level: 'warn',
            path: `./Logs/warn-${dateString}.log`
        },
        {
            level: 'error',
            path: `./Logs/error-${dateString}.log`
        }
    ],
    serializers
});

module.exports = logger;