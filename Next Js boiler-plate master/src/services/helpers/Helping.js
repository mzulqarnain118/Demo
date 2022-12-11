import { API_STATUS_CODE, AUTH, TOAST_STATUS, VERSION } from '../../appConfig/index';
import { MESSAGE,AXIOS_HEADER } from '../../appConfig';
import Cookies from 'js-cookie';
import routes from '../../appConfig/routes';
import { toast } from 'react-toastify';
import { MESSAGE_FIELD_REQUIRD, MESSAGE_NOT_FOUND, MESSAGE_SOMETHING_WRONG } from '@appConfig/message';
const { FIELD_REQUIRED, NOT_FOUND } = MESSAGE;

export default class Helping {

    static getConfig(contentType) {
        let token = Cookies.get(AUTH.AUTH_TOKEN);

        return {
            mode: 'cors',
            cache: 'no-cache',
            // You may modify the headers object.
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "X-Requested-With",
                "Authorization": token ? `Bearer ${token}` : null,
                'Content-Type': contentType ?? AXIOS_HEADER.JSON_DATA,
            },
        };
    }

    static errorStatusHandler(response) {
        if (!response) {
            this.showNotification(TOAST_STATUS.ERROR, this.getMessageString(NOT_FOUND, 'Network'))
            return false;
        }

        this.showNotification(TOAST_STATUS.ERROR, response?.data?.detail)

        if (Number(response.status) === API_STATUS_CODE.UNAUTHORIZED) {
            // if user token expire or invalid with status code 401 then it will redirect to login page
            localStorage.clear()
            Cookies.remove(AUTH.AUTH_TOKEN)
            window.location.href = routes.LOGIN;
        }
        else if (Number(response.status) === API_STATUS_CODE.NOT_FOUND) {
            // if status code 404
        }
    }

    static getMessageString = (type, variable) => {
        let currentVariable = this.getTitleCase(this.removeNumbersFromString(this.removeSpacialCharactersFromString(variable)))
        
        // Example message handle
        if (type === FIELD_REQUIRED) return `${currentVariable} ${MESSAGE_FIELD_REQUIRD}`
        if (type === NOT_FOUND) return `${currentVariable} ${MESSAGE_NOT_FOUND}`
        return `${MESSAGE_SOMETHING_WRONG} ${variable}.`
    }

    static removeSpacialCharactersFromString = (value, replaceWithSpace = true) => {
        return value.replace(/[^a-zA-Z, ]/g, replaceWithSpace ? " " : "");
    }

    static removeNumbersFromString = (value) => {
        return value.replace(/[0-9]/g, '');
    }

    static getTitleCase = (phrase) => {
        return this.removeSpacialCharactersFromString(phrase)
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    static showNotification(type = TOAST_STATUS.SUCCESS, msg) {
        // toast.error(msg)
    }
}