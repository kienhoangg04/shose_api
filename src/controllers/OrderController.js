const OrderService = require('../services/OrderService');

const createOrder = async (req, res) => {
    try {
        const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullname, address, city, phone } = req.body;
        if (
            !paymentMethod ||
            !itemsPrice ||
            !shippingPrice ||
            !totalPrice ||
            !fullname ||
            !address ||
            !city ||
            !phone
        ) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required',
            });
        }
        const response = await OrderService.createOrder(req.body);
        return res.status(200).json(response);
    } catch (error) {}
};

const getAllOrderDetails = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The user id is required',
            });
        }
        const response = await OrderService.getAllOrderDetails(userId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

const getDetailsOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The order id is required',
            });
        }
        const response = await OrderService.getDetailsOrder(orderId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

const cancelDetailsOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const data = req.body;

        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The order id is required!',
            });
        }
        const response = await OrderService.cancelDetailsOrder(orderId, data);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

const getAllOrder = async (req, res) => {
    try {
        const data = await OrderService.getAllOrder();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

const deleteManyOrder = async (req, res) => {
    try {
        const ids = req.body.ids;
        if (!ids) {
            return res.status(200).json({
                status: 'Error',
                message: 'The order ids is required!',
            });
        }
        const response = await OrderService.deleteManyOrder(ids);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!orderId) {
            return res.status(200).json({
                status: 'Error',
                message: 'The order id is required!',
            });
        }
        const response = await OrderService.deleteOrder(orderId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const data = req.body;
        if (!orderId) {
            return res.status(200).json({
                status: 'Error',
                message: 'The order id is required!',
            });
        }
        const response = await OrderService.updateOrder(orderId, data);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

module.exports = {
    createOrder,
    getAllOrderDetails,
    getDetailsOrder,
    cancelDetailsOrder,
    getAllOrder,
    deleteManyOrder,
    deleteOrder,
    updateOrder,
};
