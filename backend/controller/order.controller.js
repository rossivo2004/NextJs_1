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

// xóa order theo id 
async function deleteOrder(id) {
    try {
        const result = await ordersModel.findByIdAndDelete(id);
        return result;
    } catch (error) {
        console.log("Lỗi: ", error);
        throw error;
    }
}

async function updateOrder(id, body) {
    try {
        const { cartItems, totalAmount, userId, orderDate, orderStatus, fullName, phoneNumber, address } = body;

        // You might want to add more validation here to check the structure of the body object

        const updatedOrder = await ordersModel.findByIdAndUpdate(
            id,
            {
                cartItems,
                totalAmount,
                userId,
                orderDate,
                orderStatus,
                fullName,
                phoneNumber,
                address
            },
            { new: true } // This option returns the updated document
        );

        if (!updatedOrder) {
            throw new Error('Order does not exist');
        }
        return updatedOrder;
    } catch (error) {
        console.log("Error:", error);
        throw error;
    }
}


module.exports = { getAllOrders, createOrder, getOrderById, getOrderByIdUser, deleteOrder, updateOrder };