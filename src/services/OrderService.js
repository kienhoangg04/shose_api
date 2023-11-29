const Order = require('../models/OrderModel');
const Product = require('../models/ProductModel');
const { sendEmailCreateOrder } = require('./EmailService');

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
            email,
            isPaid,
            paiAt,
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
                        email,
                        phone,
                        city,
                    },
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    totalPrice,
                    user,
                    isPaid,
                    paiAt,
                });
                if (createOrder) {
                    await sendEmailCreateOrder(email, orderItems);
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

const getAllOrderDetails = (id) => {
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

const getDetailsOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById({
                _id: id,
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

const cancelDetailsOrder = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order = [];
            const promises = data.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product,
                        selled: { $gte: order.amount },
                    },
                    {
                        $inc: {
                            quantity: +order.amount,
                            selled: -order.amount,
                        },
                    },
                    { new: true },
                );
                if (productData) {
                    order = await Order.findByIdAndDelete(id);
                    if (order === null) {
                        resolve({
                            status: 'ERR',
                            message: 'The order is not defined',
                        });
                    }
                } else {
                    return {
                        status: 'OK',
                        message: 'ERR',
                        id: order.product,
                    };
                }
            });
            const results = await Promise.all(promises);
            const newData = results && results[0] && results[0].id;

            if (newData) {
                resolve({
                    status: 'ERR',
                    message: `San pham voi id: ${newData} khong ton tai`,
                });
            }
            resolve({
                status: 'OK',
                message: 'success',
                data: order,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.find();

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allOrder,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const deleteManyOrder = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Order.deleteMany({ _id: ids });

            resolve({
                status: 'OK',
                message: 'DELETE MANY ORDER SUCCESS',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const deleteOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkOrder = await Order.findOne({ _id: id });

            if (checkOrder === null) {
                resolve({
                    status: 'OK',
                    message: 'The order is not defined!',
                });
            }

            await Order.findByIdAndDelete(id);

            resolve({
                status: 'OK',
                message: 'DELETE USER SUCCESS',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const updateOrder = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkOrder = await Order.findOne({ _id: id });

            if (checkOrder === null) {
                resolve({
                    status: 'OK',
                    message: 'The order is not defined!',
                });
            }

            const updatedOrder = await Order.findByIdAndUpdate(id, data, { new: true });

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedOrder,
            });
        } catch (error) {
            reject(error);
        }
    });
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
