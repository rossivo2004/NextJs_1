import apiClient from './apiClient';

export const getCategories = async () => {
    try {
        const response = await apiClient.get(`categories`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch products:', error);
        throw error;
    }
};
