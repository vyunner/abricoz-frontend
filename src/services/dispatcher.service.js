import httpClient from "./http.service";
import router from "../router";
import {deleteAllCookies, getCookie, setCookie} from "@/utils/helpers/cookies.helper";

const dispatcherService = {
    async getUnassignedOrders() {
        try {
            const {status, data} = await httpClient.get('dispatcher/get-unassigned-orders');
            if (status === 200) {
                return data.data;
            }
        } catch (e) {
            console.log(e)
            return false;
        }
    },
    async getCouriers() {
        try {
            const {status, data} = await httpClient.get('dispatcher/get-couriers');
            if (status === 200) {
                return data.data;
            }
        } catch (e) {
            console.log(e)
            return false;
        }
    },
    async assignOrders(postData) {
        try {
            const {status, data} = await httpClient.post('dispatcher/assign-orders', postData);
            if (status === 200) {
                return true;
            }
        } catch (e) {
            console.log(e)
            return false;
        }
    },
    async getAssignedOrders() {
        try {
            const {status, data} = await httpClient.get('dispatcher/get-assigned-orders');
            if (status === 200) {
                return data.data;
            }
        } catch (e) {
            console.log(e)
            return false;
        }
    },
    async unassignOrders(postData) {
        try {
            const {status, data} = await httpClient.post('dispatcher/unassign-orders', postData);
            if (status === 200) {
                return true;
            }
        } catch (e) {
            console.log(e)
            return false;
        }
    },
};

export default dispatcherService;
