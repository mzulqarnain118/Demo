const logger = require('../logger/logger');

const getErrorCodes = (err, query, api = undefined, req = undefined) => {

    const data = (req) ? req.body : undefined;
    const user = (req) ? req.session?.user?.id : undefined;
    let ip = (req) ? req.ip : undefined;
    let path = (req) ? req.path : undefined;

    let id = undefined;
    let role = undefined;
    let name = undefined;
    let email = undefined;
    let emp_id = undefined;

    if (user !== undefined) {
        id = user.id;
        role = user.role;
        emp_id = user.emp_id;
        name = user.name;
        email = user.email;
    }

    if (api === undefined) {
        logger.log(`Path: ${path}, ID: ${id}, Emp ID: ${emp_id}, Role: ${role}, Name: ${name}, Email: ${email}, IP: ${ip}, Error on query: ${query}, Error: ${JSON.stringify(err)}`, 1);
        console.log(`Error on query: ${query}`);
    }
    else {
        logger.log(`Path: ${path}, ID: ${id}, Emp ID: ${emp_id}, Role: ${role}, Name: ${name}, Email: ${email}, IP: ${ip}, Error on api: ${api} on query: ${query}, Error: ${JSON.stringify(err)}`, 1);
        console.log(`Error on api: ${api} on query: ${query}`);
    }
    console.log("===============================================================\n");
    if (data !== undefined) {
        logger.log(`Path: ${path}, ID: ${id}, Emp ID: ${emp_id}, Role: ${role}, Name: ${name}, Email: ${email}, IP: ${ip}, Error on api: ${api} on query: ${query}, Data: ${JSON.stringify(data)}, Error: ${JSON.stringify(err)}`, 1);
        console.log(data);
    }
    console.log(err);
    console.log("===============================================================\n");

    if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
        return { status: 500, text: 'Internal Server Error' };
    } else if (err.errno === 1062) {
        return { status: 406, text: 'Already Exist' };
    } else if (err.errno === -4058) {
        return { status: 405, text: "File Doesn't Exist" };
    }else if (err.errno === 1644){
        return {status: 430, text: err.sqlMessage};
    }
     else {
        return { status: 422, text: 'Cannot Process Please Try Again' };
    }

}

module.exports = getErrorCodes;
