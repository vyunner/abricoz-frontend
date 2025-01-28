import httpClient from "./http.service";

const warehouseService = {
    async getCategory() {
        try {
            const {status, data} = await httpClient.get(`/category/index`);
            if (status === 200) {
                return data.data;
            }
        } catch (e) {
            console.error(e);
            return [];
        }
    },
    async getSubCategory() {
        try {
            const {status, data} = await httpClient.get(`/sub-category/index`);
            if (status === 200) {
                return data.data;
            }
        } catch (e) {
            console.error(e);
            return [];
        }
    },
    async getSubCategoryElement(id) {
        try {
            const {status, data} = await httpClient.get(`/sub-category/show/${id}`);
            if (status === 200) {
                return data.data;
            }
        } catch (e) {
            console.error(e);
            return [];
        }
    },
    async createSubCategory(SubCategoryData) {
        try {
            const {status, data} = await httpClient.post(`/sub-category/store`, SubCategoryData);
            return status === 200;
        } catch (e) {
            console.error(e);
            return false;
        }
    },
    async updateSubCategory(SubCategoryData) {
        try {
            const {status, data} = await httpClient.post(`/sub-category/update/${id}`, SubCategoryData);
            return status === 200;
        } catch (e) {
            console.error(e);
            return false;
        }
    },
    async deleteSubCategory(id) {
        try {
            const {status} = await httpClient.delete(`/sub-category/delete/${id}`);
            if (status === 200) {
                return true;
            }
        } catch (e) {
            console.error(e);
            return false;
        }
    },
};

export default warehouseService;
