module.exports = {
  TEXT_LIMIT: 50,
  AUTH:{
    AUTH_TOKEN:'Auth_Token'
  },
  ROLE: {
    USER: 'USER',
  },
  AXIOS_HEADER: {
    JSON_DATA:'application/json; charset=UTF-8',
    FORM_DATA: 'multipart/form-data',
  },
  VERSION: {
    PLATFORM: 'web',
    VERSION: '1.0',
    BUILD: '1.0',
  },
  NETWORK: {
    DEFAULT: 'network',
    NOT_FOUND: 404,
    ROUTE_NOT_FOUND: 'route_not_found',
    FAILED_REQUEST: 'request_failed',
  },
  API_STATUS_CODE: {
    SIGNUP_SUCCESS: 201,
    SUCCESS: 200,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
  },
  MESSAGE: {
    FIELD_REQUIRED: 'FIELD_REQUIRED', 
    REPLACE: 'REPLACE',
    NETWORK_NOT_FOUND: 'NOT_FOUND'
  },
  NOTIFICATION: {
    TIMER: 20000,
  },
  PAGES: {
    LIMIT: 10,
  },
  TOAST_STATUS: {
    SUCCESS: 'success',
    ERROR: 'error'
  }
}
