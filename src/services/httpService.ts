import axios from "axios";
import { toast } from "react-toastify";

  axios.defaults.baseURL = 'https://localhost:44382/';
  axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  axios.defaults.headers.common["x-auth-token"] = localStorage.getItem('token');

axios.interceptors.response.use(function (result) {
    if (result['response']) {
    const expectedError = result.status >= 400 && result.status < 500;
    
    if (!expectedError) {
        console.log("logging error", result);
        toast.error("an unexpected error");
    }

    return Promise.reject(result);
    }

    return Promise.resolve(result);
});

export default {
    get: axios.get,
    post: axios.post,
    delete: axios.delete,
    put: axios.put
}