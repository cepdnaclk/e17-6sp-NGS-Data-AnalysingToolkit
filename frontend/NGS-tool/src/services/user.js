import axios from "axios";
// import Cookies from 'js-cookie';

const API_URL = "http://127.0.0.1:8000";

class User {
  files() {
    console.log("get file names");
    return axios.get(API_URL + "/register/profile", {  }).then((res) => {
      return res;
    });
  }

 

  
}
export default new User();
