const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const school = require('../models/school');
const HttpException = require('../utils/HttpExceptionUtils');

class authController {
    
    store = async (request, response) => {
        this.checkValidation(request);
        await this.hashPassword(request);
        const result = await school.create(request.body);
        if (!result) throw new HttpException(500, 'Something went wrong');
        response.status(201).send('School Authentiction was created!');
    }


    async index(request, response) {
        return response.json({})
    }

    async show(request, response) {
        return response.json({})
    }

    async update(request, response) {
        return response.json({})
    }

    async delete(request, response) {
        return response.json({})
    }

    checkValidation(request) {
        const errors = validationResult(request)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

    // hash password if it exists
    hashPassword = async (request) => {
        if (request.body.password) {
            request.body.password = await bcrypt.hash(request.body.password, 12);
        }
    }

}

module.exports = new authController()