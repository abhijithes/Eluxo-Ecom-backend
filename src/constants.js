export const endpoints = {
    API_URL: import.meta.env.VITE_API_URL,
    UploadImages: "/uploud/image",
    createProduct: "/product/create",
    getAllProducts: (page = 1, limit = 10) => `/product/all-products?page=${page}&limit=${limit}`,
};
