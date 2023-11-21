const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService');

// regester
const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { username, email, password, dateOfBirth, address, phone, name } = newUser;
        try {
            const checkUser = await User.findOne({
                email: email,
            });
            if (checkUser !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The email is already!',
                });
            }

            //
            const hash = bcrypt.hashSync(password, 10);
            const createdUser = await User.create({
                username,
                email,
                password: hash,
                dateOfBirth,
                address,
                phone,
                name,
            });
            if (createdUser) {
                resolve({
                    status: 'OK',
                    message: 'success',
                    data: createdUser,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

// login
const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin;
        try {
            const checkUser = await User.findOne({
                email: email,
            });
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined!',
                });
            }

            //
            const comparePassword = bcrypt.compareSync(password, checkUser.password);
            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'The password is incorrect!',
                });
            }

            // token
            const access_token = genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            });
            const refresh_token = genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin,
            });

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token,
                refresh_token,
            });
        } catch (error) {
            reject(error);
        }
    });
};

//
const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ _id: id });

            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined!',
                });
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedUser,
            });
        } catch (error) {
            reject(error);
        }
    });
};

//
const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ _id: id });

            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined!',
                });
            }

            await User.findByIdAndDelete(id);

            resolve({
                status: 'OK',
                message: 'DELETE USER SUCCESS',
            });
        } catch (error) {
            reject(error);
        }
    });
};
const deleteManyUser = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await User.deleteMany({ _id: ids });

            resolve({
                status: 'OK',
                message: 'DELETE MANY USER SUCCESS',
            });
        } catch (error) {
            reject(error);
        }
    });
};

//
const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find();

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allUser,
            });
        } catch (error) {
            reject(error);
        }
    });
};

//
const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({ _id: id });

            if (user === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined!',
                });
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: user,
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    deleteManyUser,
    getAllUser,
    getDetailsUser,
};
