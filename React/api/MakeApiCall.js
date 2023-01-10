import axios from "axios";
import {toast} from "react-toastify";
import { configuration } from "../config";

export function MakeApiCall(url, data, token, type) {
    // const base_url = process.env.REACT_APP_API_URL;
    console.log("MakeApiCall",url,data,token,type,)
    return axios({
        url: configuration.baseUrl + url,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With",
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${token}`
        },
        data: data,
        method: type
    }).catch(err => {
        if (err.response.status === 422) {
            // console.log("err.response.detail",err.response.data.detail)
            toast.error(err.response.data.detail[0].msg, {
                position: 'top-center'
            });
        }
        else if(err.response.status === 409){
            toast.error(err.response.data.detail, {
                position: 'top-center'
            });
        }
        else if(err.response.status === 401){
            toast.error(err.response.data.detail, {
                position: 'top-center'
            });
        }
        else if(err.response.status === 404){
            toast.error(err.response.data.detail, {
                position: 'top-center'
            });
        }
        else {
            toast.info(err.response.data.detail, {
                position: 'top-center'
            });
        }
    })
}