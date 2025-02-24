import httpClient from "./http.service";

const warehouseService = {
    async getCategory() {
        try {
            const {status, data} = await httpClient.get(`/warehouse/get-categories`);
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
            const {status, data} = await httpClient.get(`/warehouse/get-subcategories`);
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
    async createCategory(SubCategoryData) {
        try {
            const {status, data} = await httpClient.post(`/category/store`, SubCategoryData);
            return status === 200;
        } catch (e) {
            console.error(e);
            return false;
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
    async updateCategory(categoryData) {
        try {
            const {status, data} = await httpClient.post(`/category/update/${categoryData.get("id")}`, categoryData);
            return status === 200;
        } catch (e) {
            console.error(e);
            return false;
        }
    },
    async updateSubCategory(SubCategoryData) {
        try {
            const {status, data} = await httpClient.post(`/sub-category/update/${SubCategoryData.get("id")}`, SubCategoryData);
            return status === 200;
        } catch (e) {
            console.error(e);
            return false;
        }
    },
    async deleteCategory(id) {
        try {
            const {status} = await httpClient.delete(`/category/delete/${id}`);
            if (status === 200) {
                return true;
            }
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
