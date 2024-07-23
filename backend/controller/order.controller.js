const mongoose = require('mongoose');
const ordersModel = require('../model/orderModel');

async function getAllOrders() {
    try {
        const result = await ordersModel.find();
        return result;
    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
}

async function createOrder(body) {
    try {
        const { cartItems, totalAmount, userId, orderDate, status, fullName, phoneNumber, address } = body;

        const orderData = {
            cartItems,
            totalAmount,
            userId,
            orderDate: orderDate || new Date(),
            status,
            fullName,
            phoneNumber,
            address
        };

        const newOrder = new ordersModel(orderData);
        const savedOrder = await newOrder.save();
        return savedOrder;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
//lấy sản phẩm theo id
async function getOrderById(id) {
    try {
        const result = await ordersModel.findById(id);

        if (!result) {
            throw new Error('Don hang khong ton tai')
        }
        return result;
    } catch (error) {
        console.log("Loi: ", error);
        throw error;
    }
}

// tìm kiếm order theo id user
async function getOrderByIdUser(userId) {
    try {
        const result = await ordersModel.find({ userId: userId });
        return result;
    } catch (error) {
        console.log("Lỗi: ", error);
        throw error;
    }
}



module.exports = { getAllOrders, createOrder, getOrderById, getOrderByIdUser };