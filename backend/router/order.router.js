const express = require('express');
const router = express.Router();
const ordersController = require('../controller/order.controller');
const path = require('path');
const multer = require('multer');
const Order = require('../model/orderModel'); // Adjust the path as necessary


router.get('/', async (req, res) => {
    try {
        const orders = await ordersController.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/add', async (req, res) => {
    try {
        const orderData = req.body;
        const newOrder = await ordersController.createOrder(orderData);
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const pro = await ordersController.getOrderById(id);
        return res.status(200).json(pro)
    } catch (error) {
        console.log("lỗi: ", error);
        throw error
    }
})

router.get('/userbyid/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const orders = await ordersController.getOrderByIdUser(id); // Sửa tên hàm ở đây
        return res.status(200).json(orders);
    } catch (error) {
        console.log("Lỗi: ", error);
        return res.status(500).json({ error: "Đã xảy ra lỗi khi lấy đơn đặt hàng của người dùng" });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ordersController.deleteOrder(id);
        if (result) {
            return res.status(200).json({ message: 'Category deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        console.log("Lỗi: ", error);
        res.status(500).json({ mess: error });
    }
});

// Update order by ID
router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const orderData = req.body;

        const updatedOrder = await ordersController.updateOrder(id, orderData);
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error("Error:", error);

        if (error.message === 'Order does not exist') {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Default to a generic server error
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;