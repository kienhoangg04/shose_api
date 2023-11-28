const CardService = require('../services/CardService');

const createCard = async (req, res) => {
    try {
        const { orderItems } = req.body;
        if (orderItems.length === 0) {
            return res.status(200).json({
                status: 'Error',
                message: 'The order items id is required!',
            });
        }
        const response = await CardService.createCard(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

const getAllCard = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The card id is required',
            });
        }
        const response = await CardService.getAllCard(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

const deleteCard = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(200).json({
                status: 'Error',
                message: 'The card id is required!',
            });
        }
        const response = await CardService.deleteCard(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

module.exports = {
    createCard,
    getAllCard,
    deleteCard,
};
