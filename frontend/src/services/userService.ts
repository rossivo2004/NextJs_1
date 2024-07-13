// services/userService.js
import apiClient from './apiClient';

export const getUser = async () => {
    try {
        const response = await apiClient.get(`users`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw error;
    }
};

// Thêm người dùng mới
export const addUser = async ({userData} : {userData: string}) => {
    try {
        const response = await apiClient.post('/users', userData);
        return response.data;
    } catch (error) {
        console.error('Failed to add user:', error);
        throw error;
    }
};