
const fileSystem = require('../FileSystem/FileSystem');
const bunyan = require('./Bunyan');

fileSystem.createDirectorySync('./Logs');

const log = (text, error = 0) => {

    if (error === 1) {
        bunyan.error(text);
    } else if (error === 2) {
        bunyan.warn(text);
    } else {
        bunyan.info(text);
    }

}

module.exports.log = log;
