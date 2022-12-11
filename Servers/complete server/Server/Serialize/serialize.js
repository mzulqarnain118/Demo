const mysql = require('../Database/MySql');
const serialize = (val) => {
    return ((val === null || val === 'undefined' || val === undefined || val === 'null' || val === '' || val === 'NULL' || val == 'Null' || val == 'NaN-NaN-NaN') ? `NULL` : `${mysql.escape(val)}`)
}

module.exports = serialize;