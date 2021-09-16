const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const schoolModel = require('../models/school');
const HttpException = require('../utils/HttpExceptionUtils');
const authActivationMail = require('../utils/mail/authActivationMail');
const sendMail = require("../utils/sendMail");

const { CLIENT_URL, CONTACT_US } = process.env

class authController {

    signup = async (request, response) => {
        this.checkValidation(request);
        await this.hashPassword(request);
        // const result = await schoolModel.create(request.body);
        // if (!result) throw new HttpException(500, 'Something went wrong');
        // response.status(201).send('School Authentiction was created!');
        const newSchoolAuth = request.body;
        const activation_token = this.createActivationToken(newSchoolAuth);
        const url = `${CLIENT_URL}/v1/security/key/school/activation/${activation_token}`;
        const message = authActivationMail(request.body.school_name, url, CONTACT_US);
        const subjectMail = 'Verified Email Address'
        sendMail({ to: request.body.owner_email, subject: subjectMail, text: message });
        response.status(201).send('Check your email, verify to activation start.');
    }

    signin = async (request, response, next) => {
        this.checkValidation(request);
        const { school_phone, password: pass } = request.body;
        const school = await schoolModel.findOne({ school_phone });
        if (!school) throw new HttpException(401, 'Incorrect school phone, Unable to login!');
        const isMatch = await bcrypt.compare(pass, school.password);
        if (!isMatch) throw new HttpException(401, 'Incorrect password!');
        // school matched!
        const secretKey = process.env.SECRET_JWT || "";
        const token = jwt.sign({ school_id: school._id.toString() }, secretKey, { expiresIn: '18h' });
        const { password, ...schoolWithoutPassword } = school;
        response.send({ ...schoolWithoutPassword, token });
    };


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

    checkValidation = (request) => {
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

    createActivationToken = (payload) => {
        return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' })
    }

}

module.exports = new authController()