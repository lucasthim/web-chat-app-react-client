import axios from 'axios';

class LoginService {
    constructor(){
        this.base_url = (process.env.REACT_APP_SERVER_URL || 'http://localhost:8001/');
    }

    userLogin(nickname, success,fail) {
        axios.get(`${this.base_url}login/${nickname}`,{withCredentials:true})
        .then(
            (response) => {success(response)}
            ,(error) => {fail(error)})
        .catch((error) => {fail(error)})
    } 

    userLogout(nickname, success,fail) {
        axios.get(`${this.base_url}logout/${nickname}`,{withCredentials:true})
        .then(
            (response) => {success(response)}
            ,(error) => {fail(error)})
        .catch((error) => {fail(error)})
    }
}

export default LoginService;