import axios from 'axios';
// import Cookies from 'js-cookie';

const API_URL = 'http://127.0.0.1:8000';

class MlModelServices{ 
 

    normalization(fileName, tech){

        console.log('normalization called')
        var userid = 1;
    return axios.post(API_URL +'/normalization', {userid, fileName, tech})
    .then(res => {
       
    
        return res;
    })

    }

  
}
export default new MlModelServices;