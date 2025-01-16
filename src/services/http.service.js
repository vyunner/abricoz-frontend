import axios from 'axios';
import authService from "./auth.service";
import router from '../router';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
//const API_URL = 'https://back.uib.kz/'
/** Default config for axios instance */
const API_ENDPOINT = process.env.VUE_APP_API_URL;
let config = {
    baseURL: `${API_ENDPOINT}`,
};

/** Creating the instance for axios */
const httpClient = axios.create(config);

/** Auth token interceptors */
const authInterceptor = config => {
    config.headers.Authorization = `Bearer ${authService.getToken()}`;
    return config;
};


/** Adding the request interceptors */
httpClient.interceptors.request.use(authInterceptor);

/** Adding the response interceptors */
httpClient.interceptors.response.use(
    response => {
        /** TODO: Add any response interceptors */
        return response;
    },
    error => {
        if (error.response.status === 401) {
            authService.logout()
            // router.push({name: 'login'})
        }
        // if (error.response.status === 403) {
        //     router.push({name: 'restrict'})
        // }
        /** TODO: Do something with response error */
        return Promise.reject(error);
    }
);

export default httpClient;
