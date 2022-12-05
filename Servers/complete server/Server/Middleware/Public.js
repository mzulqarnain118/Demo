
const restrictedRoutes = require('./RestrictedRoutes');
const logger = require('../logger/logger');

const isAllowed = (route, user, origin, token) => {

    const allowedRoles = (roles) => {
        if (roles === undefined && user === undefined)
            return false;
        if (roles === undefined && user)
            return true;
        for (let i = 0; i < roles.length; i++) {
            if (roles[i] === user.role)
                return true;
        }
        return false;

    }

    for (let i = 0; i < restrictedRoutes.public.length; i++) {
        if (route === restrictedRoutes.public[i].route && restrictedRoutes.public[i].origin[origin] === token) {
            if ((restrictedRoutes.public[i].roles === 'any') || allowedRoles(restrictedRoutes.public[i].roles))
                return true;
            else
                return false;
        }
    }

    return false;

}

const middleware = async (req, res, next) => {

    if (req.access === 'private') {
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

    if (isAllowed(path, user, req.get('origin'), req.headers.token)) {
        console.log("=========================================================================================");
        console.log(`Allowed: Accesing Route ${path} With Origin: ${req.get('origin')}`);
        console.log(`ID: ${id},Emp ID: ${emp_id}, Role: ${role} Name: ${name}, Email: ${email}`);
        console.log("=========================================================================================\n");
        logger.log(`Allowed: Accesing Route ${path} With Origin: ${req.get('origin')} ID: ${id},Emp ID: ${emp_id}, Role: ${role}, Name: ${name}, Email: ${email}, IP: ${req.ip}`);
        next();
    } else {
        console.log("=========================================================================================");
        console.log(`Rejected: Accesing Route ${path} With Origin: ${req.get('origin')}`);
        console.log(`ID: ${id},Emp ID: ${emp_id}, Role: ${role} Name: ${name}, Email: ${email}`);
        console.log("=========================================================================================\n");
        logger.log(`Rejected: Accesing Route ${path} With Origin: ${req.get('origin')} ID: ${id},Emp ID: ${emp_id}, Role: ${role}, Name: ${name}, Email: ${email}, IP: ${req.ip}`, 2);
        res.send('UnAuthorized!');
    }

}

module.exports = middleware;
