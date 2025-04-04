import httpClient from "./http.service";

const adsService = {
    async click(ads) {
        try {
            const {status} = await httpClient.post(`/ad/click`, ads)
            return status === 200;
        } catch (e) {
            console.error(e);
            return false;
        }
    },
};

export default adsService;
