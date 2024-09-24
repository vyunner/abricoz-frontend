import httpClient from "./http.service";
import router from "../router";
import {deleteAllCookies, getCookie, setCookie} from "@/utils/helpers/cookies.helper";
import axios from "axios";

const API_ENDPOINT = process.env.VUE_APP_API_URL;

const authService = {
    getToken() {
        return getCookie('ACCESS_TOKEN')
    },
    async code(userData) {
        try {
            const {status, data} = await axios.post(API_ENDPOINT + '/auth/code', userData);
            if (status === 200) {
                return true;
            }
        } catch (e) {
            console.log(e)
            return false;
        }
    },
    async login(userData) {
        try {
            const {status, data} = await axios.post(API_ENDPOINT + '/auth/login', userData);
            if (status === 200) {
                setCookie('ACCESS_TOKEN', data.data.token, 3000000);
                setCookie('PHONE', data.data.user.phone, 3000000);
                return true;
            }
            return false;
        } catch (e) {
            return false
        }
    },
    logout() {
        localStorage.clear()
        deleteAllCookies()
        router.push('/auth')
    },
};

export default authService;
