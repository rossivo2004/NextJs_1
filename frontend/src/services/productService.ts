import apiClient from './apiClient';
import { useRouter } from 'next/router';

export const getProducts = async (page = 1) => {
    try {
        const response = await apiClient.get(`/products/?page=${page}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch products:', error);
        throw error;
    }
};

export const getProductSale = async () => {
    try {
        const response = await apiClient.get(`/products/discount/discountedProducts`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch products:', error);
        throw error;
    }
};

export const getProductHot = async () => {
    try {
        const response = await apiClient.get(`/products/productsHot`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch products:', error);
        throw error;
    }
};

export const getProductsCountByCategory = async (categoryTag) => {
    try {
        const response = await apiClient.get(`/products/countByCategoryTag/${categoryTag}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch products:', error);
        throw error;
    }
};

export const getProductsCategory = async (categoryTag) => {
    try {
        const response = await apiClient.get(`/products/tagname/${categoryTag}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch products:', error);
        throw error;
    }
};

export const getProductsById = async (id) => {
    try {
        const response = await apiClient.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch products:', error);
        throw error;
    }
};

export const getFilteredProductsByPrice = async (min, max) => {
    try {
        const response = await apiClient.get(`/products/filterByPrice?minPrice=${min}&maxPrice=${max}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch products with price range ${min} - ${max}:`, error.response?.data || error.message);
        throw new Error('Failed to fetch products. Please try again later.');
    }
};

const getPrriceQueryParams = (queryParams, key, value) => {
    queryParams.set(key, value);
    return queryParams;
};

export default getPrriceQueryParams;

export const incrementProductView = async (id) => {
    try {
        const response = await apiClient.post(`/products/increment-view/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to increment: ', error);
        throw new Error('Failed to increment product view');
    }
}