import axios from 'axios';
// import Cookies from 'js-cookie';

const API_URL = 'http://127.0.0.1:8000';

class MlModelServices{ 

    // Normalization
    normalization(fileName, method){
        console.log('normalization called')
        var userid = 1;
    return axios.post(API_URL +'/normalize/normalize', {method, fileName, userid})
    .then(res => {
        return res;
    })
    }//Normalization End


}
export default new MlModelServices;