import httpClient from "./http.service";

const warehouseService = {
    async search(name) {
        try {
            const {status, data} = await httpClient.get(`/warehouse/search`, {
                params: {name}
            });
            if (status === 200) {
                return data.data;
            }
        } catch (e) {
            console.error(e);
            return false;
        }
    },
    async searchBySubCategory(subcategory_id) {
        try {
            const {status, data} = await httpClient.get(`/product/index?subcategory_id[]=${subcategory_id}`,);
            if (status === 200) {
                return data.data;
            }
        } catch (e) {
            console.error(e);
            return false;
        }
    },
    async getSubcategories() {
        try {
            const {status, data} = await httpClient.get(`/warehouse/get-subcategories`);
            if (status === 200) {
                return data.data;
            }
        } catch (e) {
            console.error(e);
            return [];
        }
    },
    async createProduct(productData) {
        try {
            const {status, data} = await httpClient.post(`/warehouse/create-product`, productData);
            return status === 200;
        } catch (e) {
            console.error(e);
            return false;
        }
    },
    async getProducts() {
        try {
            const {status, data} = await httpClient.get(`/warehouse/get-products`);
            if (status === 200) {
                return data.data;
            }
        } catch (e) {
            console.error(e);
            return false;
        }
    },
    async updateProduct(id, productData) {
        try {
            const {status, data} = await httpClient.put(`/warehouse/update-product/${id}`, productData);
            return status === 200;
        } catch (e) {
            console.error(e);
            return false;
        }
    },
    async deleteProduct(id) {
        try {
            const {status} = await httpClient.delete(`/warehouse/delete-product/${id}`);
            if (status === 200) {
                return true;
            }
        } catch (e) {
            console.error(e);
            return false;
        }
    },
    async getBrands(query) {
        try {
            const {status, data} = await httpClient.get(`/warehouse/get-brands`, {
                params: {search: query}
            });
            if (status === 200) {
                return data.data;
            }
        } catch (e) {
            console.error(e);
            return [];
        }
    },
    async getCountries(query) {
        try {
            const {status, data} = await httpClient.get(`/warehouse/get-countries`, {
                params: {search: query}
            });
            if (status === 200) {
                return data.data;
            }
        } catch (e) {
            console.error(e);
            return [];
        }
    },
    async addPhotoProduct(formData, id) {
        try {
            const {status} = await httpClient.post(`/warehouse/add-photo-product/${id}`, formData)
            return status === 200;
        } catch (e) {
            console.error(e);
            return false;
        }
    },
};

export default warehouseService;
