import httpClient from "./http.service";

const posService = {
    async searchProduct(query) {
        try {
            const response = await httpClient.get(`/pos/search-product?${query}`);
            return response.data;
        } catch (e) {
            console.error(e);
            return null;
        }
    },

    async changeProductAmount(data) {
        try {
            const response = await httpClient.post('/pos/change-product-amount', data);
            return response.data;
        } catch (e) {
            console.error("Ошибка запроса:", e);
            throw e;
        }
    },

    async getSubcategories() {
        try {
            const response = await httpClient.get('/pos/get-subcategories');
            return response.data;
        } catch (e) {
            console.error("Ошибка запроса:", e);
            throw e;
        }
    },

    async updateProduct(data, id) {
        try {
            const response = await httpClient.post('/pos/update-product/' + id, data);
            return response.data;
        } catch (e) {
            console.error("Ошибка запроса:", e);
            throw e;
        }
    },

    async uploadProductPhoto(formData) {
        try {
            const response = await httpClient.post('/pos/upload-product-photo', formData);
            return response.data;
        } catch (e) {
            console.error("Ошибка загрузки фото:", e);
            throw e;
        }
    },

    async createProduct(formData) {
        try {
            const response = await httpClient.post('/pos/create-product', formData);
            return response.data;
        } catch (e) {
            console.error("Ошибка загрузки фото:", e);
            throw e;
        }
    },
};

export default posService;
