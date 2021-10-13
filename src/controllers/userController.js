const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const UserModel = require('../models/userModel');
const HttpException = require('../utils/HttpExceptionUtils');

class UserController {

    registerSendMail = async (request, response, next) => {
        this.checkValidation(request.body);
        // await this.hashPassword(req);
        // const result = await UserModel.create(req.body);
        // if (!result) throw new HttpException(500, 'Something went wrong');
        // return response.status(201).json({ success: 'User was created!' });
        // new HttpException(500, 'Something went wrong');
        return response.status(500).json({ errors: 'Backend: Something went wrong.' });
    }

    checkValidation = (request) => {
        const errors = validationResult(request)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

}

module.exports = new UserController;