import httpClient from "./http.service";

const teamService = {
    async index() {
        try {
            const {status, data} = await httpClient.get('team/index');
            if (status === 200) {
                return data.data;
            }
        } catch (e) {
            return false;
        }
    }
};

export default teamService;
