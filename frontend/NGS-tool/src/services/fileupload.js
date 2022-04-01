import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

class FileUpload {

    upload(formData) {
        console.log("upload called");
        return axios.post(API_URL + '/upload', { formData },
            // { headers: { 'Content-Type': 'multipart/form-data' } }
        )
            .then(res => {
                return res;
            })
    }
}

export default new FileUpload;