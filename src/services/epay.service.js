import httpClient from "./http.service";

const epayService = {
    async getSaveCardToken(user_id) {
        try {
            const {status, data} = await httpClient.get('epay/get-save-card-token/' + user_id);
            if (status === 200) {
                return data.data;
            }
        } catch (e) {
            console.log(e)
            return false;
        }
    },
};

export default epayService;
