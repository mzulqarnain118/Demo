
const serverInfo = require('../Info/ServerInfo');
const jwt = require('jsonwebtoken');

const getToken = async (data) => {

    try {

        const token = await jwt.sign(data, serverInfo.jwtKey);
        return await token;

    } catch (err) {

        console.log(err);
        return undefined;

    }

}

const getExpirableToken = async (data, timeInMinutes) => {

    try {

        const token = await jwt.sign(data, serverInfo.jwtKey, { expiresIn: timeInMinutes + " minutes" });
        return await token;

    } catch (err) {

        console.log(err);
        return undefined;

    }

}

const getTokenData = async (token) => {

    try {

        const result = jwt.verify(token, serverInfo.jwtKey);
        return await result;

    } catch (err) {
        console.log(err);
        return undefined;

    }

}

module.exports.getToken = getToken;
module.exports.getExpirableToken = getExpirableToken;
module.exports.getTokenData = getTokenData;
