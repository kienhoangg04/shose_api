const Order = require('../models/OrderModel');

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {
                orderItems,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice,
                fullname,
                address,
                city,
                phone,
                user,
            } = newOrder;
            const createOrder = await Order.create({
                orderItems,
                shippingAdress: {
                    fullname,
                    address,
                    phone,
                    city,
                },
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice,
                user,
            });
            if (createOrder) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createOrder,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createOrder,
};
