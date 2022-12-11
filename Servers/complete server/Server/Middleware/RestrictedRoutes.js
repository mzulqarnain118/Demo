
const serverInfo = require('../Info/ServerInfo');

module.exports.private = [

    { route: '/api/getUser', roles: undefined },
    { route: '/api/login', roles: undefined },
    { route: '/api/reset', roles: undefined },
    { route: '/api/employee', roles: ['ADM'] },
    { route: '/api/advertismentform', roles: ['ADM'] },
    { route: '/api/changePasswordAdmin', roles: ['ADM'] }

];

// module.exports.public = [

//     { route: '/api/get_teaching_emp', roles: 'any', origin: { 'http://lms.gcu.edu.pk:10016': serverInfo.lmsToken, 'http://localhost:4200': serverInfo.lmsToken } },
//     { route: '/api/getdesignation', roles: 'any', origin: { 'http://111.68.103.118:10105': serverInfo.workflowToken, 'http://localhost:4001': serverInfo.workflowToken, 'http://localhost:4000': serverInfo.workflowToken } },
//     { route: '/api/getsubdepartmentdata', roles: 'any', origin: { 'http://111.68.103.118:10105': serverInfo.workflowToken, 'http://localhost:4001': serverInfo.workflowToken, 'http://localhost:4000': serverInfo.workflowToken } },
//     { route: '/api/getdepartment', roles: 'any', origin: { 'http://111.68.103.118:10105': serverInfo.workflowToken, 'http://localhost:4001': serverInfo.workflowToken, 'http://localhost:4000': serverInfo.workflowToken } },
//     { route: '/api/get_employee_based_on_desig', roles: 'any', origin: { 'http://111.68.103.118:10105': serverInfo.workflowToken, 'http://localhost:4001': serverInfo.workflowToken, 'http://localhost:4000': serverInfo.workflowToken } },
//     { route: '/api/get_emp_unique_desig', roles: 'any', origin: { 'http://111.68.103.118:10105': serverInfo.workflowToken, 'http://localhost:4001': serverInfo.workflowToken, 'http://localhost:4000': serverInfo.workflowToken } },
//     { route: '/api/get_emp_detail', roles: 'any', origin: { 'http://111.68.103.118:10105': serverInfo.workflowToken, 'http://localhost:4001': serverInfo.workflowToken, 'http://localhost:4000': serverInfo.workflowToken } },
//     { route: '/api/get_emp_detail_by_id', roles: 'any', origin: { 'http://111.68.103.118:10105': serverInfo.workflowToken, 'http://localhost:4001': serverInfo.workflowToken, 'http://localhost:4000': serverInfo.workflowToken } },
//     { route: '/api/downloadorder', roles: 'any', origin: { 'http://111.68.103.118:10105': serverInfo.workflowToken, 'http://localhost:4001': serverInfo.workflowToken, 'http://localhost:4000': serverInfo.workflowToken } }

// ];
