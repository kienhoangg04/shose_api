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

module.exports = {
    createOrder,
};