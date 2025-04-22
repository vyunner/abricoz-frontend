import httpClient from "./http.service";

const posService = {
    async searchProduct(query) {
        try {
            const response = await httpClient.get(`/pos/search-product?${query}`);
            return response.data; // ← ВАЖНО: возвращаем объект, а не статус
        } catch (e) {
            console.error(e);
            return null;
        }
    },
};

export default posService;
