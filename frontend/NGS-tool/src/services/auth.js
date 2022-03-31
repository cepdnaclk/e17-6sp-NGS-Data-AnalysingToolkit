import axios from "axios";
// import Cookies from 'js-cookie';

const API_URL = "http://127.0.0.1:8000";

class AuthService {
  login(username, password) {
    console.log("login");
<<<<<<< HEAD
    return axios.post(API_URL + "/login", { email, password }).then((res) => {
      return res;
=======
    return axios.post(API_URL + "/register/login", { username, password }).then((res) => {
      // const {access_token, refresh_token, profile} = res.data;
      // Cookies.set('access_token', access_token);
      // Cookies.set('refresh_token', refresh_token);
      // Cookies.set( 'name',profile.name );
      // Cookies.set( 'address', profile.address);
      // Cookies.set( 'nic', profile.nic);
      // Cookies.set( 'phoneno', profile.phoneno);
      // Cookies.set( 'email', profile.email);
      // var arr = JSON.stringify(profile.roles)
      // Cookies.set( 'roles',arr);
      console.log(res.data)
      return res; 
>>>>>>> 1ace2aceedf8b411b8135a111037df6277be0136
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
