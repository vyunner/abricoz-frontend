import httpClient from "./http.service";
import router from "../router";
import {deleteAllCookies, getCookie, setCookie} from "@/utils/helpers/cookies.helper";

const userService = {
    async getUsersWithRoles() {
        try {
            const {status, data} = await httpClient.get('admin/get-users-with-roles');
            if (status === 200) {
                return data.data;
            }
        } catch (e) {
            console.log(e)
            return false;
        }
    },
    async getUser(phone) {
        try {
            const {status, data} = await httpClient.get('admin/get-user?phone=' + phone);
            if (status === 200) {
                return data.data;
            }
        } catch (e) {
            console.log(e)
            return false;
        }
    },
    async setRoles(postData) {
        try {
            const {status, data} = await httpClient.post('admin/set-roles', postData);
            if (status === 200) {
                return true;
            }
        } catch (e) {
            console.log(e)
            return false;
        }
    },
    async getRoles() {
        try {
            const {status, data} = await httpClient.get('admin/get-roles');
            if (status === 200) {
                return data.data;
            }
        } catch (e) {
            console.log(e)
            return false;
        }
    },
};

export default userService;
