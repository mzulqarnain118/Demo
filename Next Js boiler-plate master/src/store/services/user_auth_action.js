import routes from 'appConfig/routes';
import { API_URL } from 'appConfig/urls';
import Cookies from 'js-cookie';
import Helping from 'services/helpers/Helping';
import Service from 'services/helpers/service';
import jwt_decode from "jwt-decode";
import { API_STATUS_CODE } from '../../appConfig'
import { LOGIN_END_POINT, SIGNUP_END_POINT } from '@appConfig/apiEndPoints';

export const userLogin = (payload, contantType = null, router, setLoading) => {
    return dispatch => {
        return Service.postCall(API_URL.BASE_URL + LOGIN_END_POINT, payload, contantType).then(response => {
            if (response?.status === API_STATUS_CODE.SUCCESS) {
                let decoded = jwt_decode(response.data.access_token);
                localStorage.setItem("username", decoded.sub);
                localStorage.setItem("token", response.data.access_token);
                localStorage.setItem("default_dashboard_id", decoded.dashboard_id);
                localStorage.setItem("default_Dashboard_name", decoded.dashboard_name);                
                Cookies.set("Auth_Token", response?.data?.access_token)
                document.cookie = `username=${data.username};password=${data.password}`;
                router.push(routes.DASHBOARD)
            }

        }).catch(error => {
            setLoading(false)
            Helping.errorStatusHandler(error.response);
        });
    }
};

export const userSignup = (payload, router, setLoading) => {
    return dispatch => {
        return Service.postCall(API_URL.BASE_URL + SIGNUP_END_POINT, payload).then(response => {
            if (response?.status === API_STATUS_CODE.SIGNUP_SUCCESS) {
                router.push(routes.LOGIN)
            }
        }).catch(error => {
            setLoading(false)
            Helping.errorStatusHandler(error.response);
        });
    }
};