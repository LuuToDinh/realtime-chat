const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const UserModel = require('../Models/UserModel');
const createToken = require('../../utils/createToken');

class UserController {
    async register(req, res, next) {
        try {
            const { name, email, password } = req.body;

            const existedUser = await UserModel.findOne({ email });
            if (existedUser) {
                return res.status(400).json({ message: 'User already have registered' });
            }

            const isNonEmptyField = name && email && password;
            if (!isNonEmptyField) {
                return res.status(400).json({ message: 'Some fields did not be typed' });
            }

            const isValidEmail = validator.isEmail(email);
            if (!isValidEmail) {
                return res.status(400).json({ message: 'Invalid email' });
            }

            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            const user = new UserModel({ name, email, password: hashedPassword });
            await user.save();

            // return res.send('OK');

            const token = createToken(user._id);
            return res.status(200).json({
                message: 'Register successfully',
                userInfo: { _id: user._id, name, email, token },
            });
        } catch (error) {
            return res.status(500).json({ message: `Undefinded error of the server side: ${error}` });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid email' });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(400).json({ message: 'The password is not correct' });
            }

            const token = createToken(user._id);
            return res.status(200).json({
                message: 'Login successfully',
                userInfo: { _id: user._id, name: user.name, email, token },
            });
        } catch (error) {
            return res.status(500).json({ message: `Undefinded error of the server side: ${error}` });
        }
    }

    async find(req, res) {
        try {
            const id = req.params.userId;
            const user = await UserModel.find({ _id: id });
            if (!user) {
                return res.status(400).json(`Can not find any user has id: ${id}`);
            }

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: `Undefinded error of the server side: ${error}` });
        }
    }

    async users(req, res) {
        try {
            const id = req.params.userId;
            const user = await UserModel.find();
            if (!user) {
                return res.status(400).json(`Can not find any user has id: ${id}`);
            }

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: `Undefinded error of the server side: ${error}` });
        }
    }
}

module.exports = new UserController();
