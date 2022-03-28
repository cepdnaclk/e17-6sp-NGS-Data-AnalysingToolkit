import axios from 'axios';
// import Cookies from 'js-cookie';

const API_URL = 'http://127.0.0.1:8000';

class AuthService{ 
 

    login(email, password){

        console.log('login')
    return axios.post(API_URL +'/login', {email, password})
    .then(res => {
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
        
        return res;
    })

    }

    signup(username, email, password){
        console.log('register')
        return axios.post(API_URL + '/register', {username, email, password})
        .then(res => {
            return res;
        })
    }

    logout(){
        //localStorage.removeItem('isLoggedIn');
       
        console.log('calledd logout');
    }

    
}
export default new AuthService;