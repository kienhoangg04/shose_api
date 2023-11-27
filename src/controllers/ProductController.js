const ProductService = require('../services/ProductService');

const createProduct = async (req, res) => {
    try {
        const { title, image, type, price, price_old, countInStock, rating, description } = req.body;

        if (!title || !image || !type || !price || !price_old || !countInStock || !rating) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required',
            });
        }
        const response = await ProductService.createProduct(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            message: e,
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const data = req.body;
        if (!productId) {
            return res.status(200).json({
                status: 'Error',
                message: 'The product id is required!',
            });
        }
        const response = await ProductService.updateProduct(productId, data);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(200).json({
                status: 'Error',
                message: 'The product id is required!',
            });
        }
        const response = await ProductService.deleteProduct(productId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};
const deleteManyProduct = async (req, res) => {
    try {
        const ids = req.body.ids;
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The product ids is required!',
            });
        }
        const response = await ProductService.deleteManyProduct(ids);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query;
        const response = await ProductService.getAllProduct(Number(limit) || null, Number(page) || 0, sort, filter);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};
const getProductHome = async (req, res) => {
    try {
        const { filter } = req.query;
        const response = await ProductService.getProductHome(filter);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

const getProductRelate = async (req, res) => {
    try {
        const { id } = req.body;
        const response = await ProductService.getProductRelate(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(200).json({
                status: 'Error',
                message: 'The product id is required!',
            });
        }
        const response = await ProductService.getDetailsProduct(productId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

const getAllType = async (req, res) => {
    try {
        const response = await ProductService.getAllType();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    deleteManyProduct,
    getAllProduct,
    getDetailsProduct,
    getAllType,
    getProductHome,
    getProductRelate,
};
