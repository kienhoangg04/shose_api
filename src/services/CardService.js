const Card = require('../models/CardModel');

const createCard = (newCard) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, user } = newCard;
        try {
            const createCard = await Card.create({
                orderItems,
                user,
            });
            if (createCard) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const getAllCard = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const card = await Card.findOne({
                user: id,
            });
            if (card === null) {
                resolve({
                    status: 'OK',
                    message: 'The order is not defined!',
                });
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: card,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const deleteCard = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCard = await Card.findOne({ user: id });

            if (checkCard === null) {
                resolve({
                    status: 'OK',
                    message: 'The card is not defined!',
                });
            }

            await Card.findOneAndDelete({
                user: id,
            });

            resolve({
                status: 'OK',
                message: 'DELETE CARD SUCCESS',
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createCard,
    getAllCard,
    deleteCard,
};
