
const restrictedRoutes = require('./RestrictedRoutes');
const logger = require('../logger/logger');
const serverInfo = require('../Info/ServerInfo');

const isAllowed = (route, user) => {

    const allowedRoles = (roles) => {
        if (user === undefined)
            return false;
        for (let i = 0; i < roles.length; i++) {
            if (roles[i] === user.role)
                return true;
        }
        return false;

    }

    for (let i = 0; i < restrictedRoutes.private.length; i++) {
        if (route === restrictedRoutes.private[i].route) {
            if ((restrictedRoutes.private[i].roles === undefined) || allowedRoles(restrictedRoutes.private[i].roles))
                return true;
            else
                return false;
        }
    }

    if (user)
        return true;
    else
        return false;

}

const middleware = async (req, res, next) => {

    if (req.access === 'public' || !req.path.includes('/api/')) {
        next();
        return;
    }

    const path = req.path;
    let user = undefined;

    if (req.session.user)
        user = req.session.user;

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

    if (isAllowed(path, user) && req.headers?.csrf_token === serverInfo.csrfToken) {
        console.log("===============================================================");
        console.log(`Allowed: Accesing Route ${path} With ID: ${id},Emp ID: ${emp_id}, Role: ${role}`);
        console.log(`         Name: ${name}, Email: ${email}`);
        console.log("===============================================================\n");
        logger.log(`Allowed: Accesing Route ${path} With ID: ${id},Emp ID: ${emp_id}, Role: ${role}, Name: ${name}, Email: ${email}, IP: ${req.ip}`);
        next();
    } else {
        console.log("===============================================================");
        console.log(`Rejected: Accesing Route ${path} With ID: ${id},Emp ID: ${emp_id}, Role: ${role}`);
        console.log(`         Name: ${name}, Email: ${email}`);
        console.log("===============================================================\n");
        logger.log(`Rejected: Accesing Route ${path} With ID: ${id},Emp ID: ${emp_id}, Role: ${role}, Name: ${name}, Email: ${email}, IP: ${req.ip}`, 2);
        res.status(202).send('/login');
    }

}

module.exports = middleware;
