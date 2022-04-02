import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';
class BoxPlot {

    boxPlot(name, fileName) {
        console.log(fileName)
        return axios.post(API_URL + '/plotdata', { name, fileName },
            // { headers: { 'Content-Type': 'multipart/form-data' } }
            
        ).then(res => {
                return res;
            })

    }
}

export default new BoxPlot;