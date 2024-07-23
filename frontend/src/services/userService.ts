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

export const getUserDetail = async (id) => {
    try {
        const response = await apiClient.get(`/users/${id}`);
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

// Sửa thông tin người ùng
export const editUser = async (id, userData) => {
    try {
        const response = await apiClient.put(`/users/edit/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error('Failed to edit user:', error);
        throw error;
    }
};