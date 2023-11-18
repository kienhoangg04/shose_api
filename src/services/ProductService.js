const Product = require('../models/ProductModel');

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { title, image, type, price, price_old, countInStock, rating, description, sale } = newProduct;
        try {
            const checkProduct = await Product.findOne({
                title: title,
            });
            if (checkProduct !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The name of product is already!',
                });
            }
            const newProduct = await Product.create({
                title,
                image,
                type,
                price,
                price_old,
                countInStock,
                rating,
                description,
                sale,
            });
            if (newProduct) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newProduct,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id,
            });

            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined!',
                });
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedProduct,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id,
            });
            if (checkProduct === null) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined!',
                });
            }

            await Product.findByIdAndDelete(id);
            resolve({
                status: 'OK',
                message: 'DELETE PRODUCT SUCCESS',
            });
        } catch (error) {
            reject(error);
        }
    });
};
const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({ _id: ids });
            resolve({
                status: 'OK',
                message: 'DELETE MANY PRODUCT SUCCESS',
            });
        } catch (error) {
            reject(error);
        }
    });
};
const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.count();

            if (filter) {
                let label = filter[0];
                const label2 = filter[1];
                const objectFilter = {
                    [label]: { $regex: `${label2}` },
                };
                const allProductFilter = await Product.find(objectFilter)
                    .limit(limit)
                    .skip(limit * page);

                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    total: totalProduct,
                    totalPage: Math.ceil(totalProduct / limit),
                    pageCurrent: Number(page + 1),
                    data: allProductFilter,
                });
            }

            if (sort) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0];
                const allProductSort = await Product.find()
                    .limit(limit)
                    .skip(limit * page)
                    .sort(objectSort);

                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    total: totalProduct,
                    totalPage: Math.ceil(totalProduct / limit),
                    pageCurrent: Number(page + 1),
                    data: allProductSort,
                });
            }

            const allProduct = await Product.find()
                .limit(limit)
                .skip(limit * page);

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                total: totalProduct,
                totalPage: Math.ceil(totalProduct / limit),
                pageCurrent: Number(page + 1),
                data: allProduct,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id,
            });
            if (product === null) {
                resolve({
                    status: 'OK',
                    message: 'The product is not defined!',
                });
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: product,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Product.distinct('type');

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allType,
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    deleteManyProduct,
    getAllProduct,
    getDetailsProduct,
    getAllType,
};
