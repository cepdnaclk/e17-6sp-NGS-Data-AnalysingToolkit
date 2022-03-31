import axios from "axios";
// import Cookies from 'js-cookie';

const API_URL = "http://127.0.0.1:8000";

class AuthService {
  login(username, password) {
    console.log("login");
    return axios.post(API_URL + "/login", { email, password }).then((res) => {
      return res;
    });
  }

  signup(username, email, password1, password2) {
    console.log("register");
    return axios
      .post(API_URL + "/register/signup", {
        username,
        email,
        password1,
        password2,
      })
      .then((res) => {
        return res;
      });
  }

  logout() {
    //localStorage.removeItem('isLoggedIn');

    console.log("calledd logout");
  }
}
export default new AuthService();
