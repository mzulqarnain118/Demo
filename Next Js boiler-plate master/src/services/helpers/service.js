import axios from 'axios';
import Helping from './Helping';

export default class Service {

  static getCall(url) {
    return axios.get(url, Helping.getConfig());
  }

  static postCall(url, body, contantType) {
    return axios.post(url, body, Helping.getConfig(contantType));
  }

  static putCall(url, body) {
    return axios.put(url, body, Helping.getConfig());
  }

  static delCall(url) {
    return axios.delete(url, Helping.getConfig());
  }

}
