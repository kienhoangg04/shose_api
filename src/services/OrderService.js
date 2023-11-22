const Order = require('../models/OrderModel');
const Product = require('../models/ProductModel');

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
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
        try {
            const promise = orderItems.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product,
                        quantity: { $gte: order.amount },
                    },
                    {
                        $inc: {
                            quantity: -order.amount,
                            selled: +order.amount,
                        },
                    },
                    {
                        new: true,
                    },
                );
                if (productData) {
                    return {
                        status: 'OK',
                        message: 'SUCCESS',
                    };
                } else {
                    return {
                        status: 'OK',
                        message: 'ERR',
                        id: order.product,
                    };
                }
            });

            const result = await Promise.all(promise);
            const newData = result.filter((item) => item.id);

            if (newData.length) {
                resolve({
                    status: 'ERR',
                    message: `Sản phẩm với id ${newData.join(',')} không đủ hàng!`,
                });
            } else {
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
                    });
                }
            }
        } catch (error) {
            reject(error);
        }
    });
};

const getOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({
                user: id,
            });
            if (order === null) {
                resolve({
                    status: 'OK',
                    message: 'The order is not defined!',
                });
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: order,
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createOrder,
    getOrderDetails,
};
