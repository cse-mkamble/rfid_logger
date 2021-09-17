const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const schoolModel = require('../models/school');
const HttpException = require('../utils/HttpExceptionUtils');
const activationMail = require('../utils/mail/activationMail');
const forgotPasswordMail = require('../utils/mail/forgotPasswordMail');
const resetPasswordMail = require('../utils/mail/resetPasswordMail');
const updateSchoolAuthMail = require('../utils/mail/updateSchoolAuthMail');
const sendMail = require("../utils/sendMail");

const { CLIENT_URL, CONTACT_US } = process.env

class authController {

    signup = async (request, response) => {
        this.checkValidation(request);
        await this.hashPassword(request);
        const newSchoolAuth = request.body;
        const activation_token = this.createActivationToken(newSchoolAuth);
        const url = `${CLIENT_URL}/school/activation/${activation_token}`;
        const message = activationMail(request.body.school_name, url, CONTACT_US, Date.now());
        const subjectMail = 'Verified Email Address'
        sendMail({ to: request.body.owner_email, subject: subjectMail, text: message });
        response.status(201).send('Check your email, verify to activation start.');
    }

    activation = async (request, response) => {
        const { activation_token } = request.body;
        const school = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET);
        if (!school) throw new HttpException(401, 'Invalid School.');
        const result = await schoolModel.create(school);
        if (!result) throw new HttpException(500, 'Something went wrong');
        response.status(201).send('School Authentiction was created!');
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

    forgotPassword = async (request, response) => {
        const { school_phone } = request.body;
        if (!school_phone) throw new HttpException(401, 'Fields must not be empty! school phone');
        try {
            const school = await schoolModel.findOne({ school_phone });
            if (!school) { throw new HttpException(401, 'Invalid School.'); } else {
                const access_token = jwt.sign({ school_id: school._id.toString(), email: school.owner_email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
                const url = `${CLIENT_URL}/school/resetpassword/${school._id.toString()}/${access_token}`;
                const subjectMail = 'Reset Password';
                const message = forgotPasswordMail(school.school_name, url, CONTACT_US, Date.now());
                sendMail({ to: school.owner_email, subject: subjectMail, text: message });
                response.status(201).send("Re-send the password, please check your email.");
            }
        } catch (error) {
            throw new HttpException(500, 'Something went wrong');
        }
    }

    resetPassword = async (request, response) => {
        this.checkValidation(request);
        try {
            await this.hashPassword(request);
            const { confirm_password, ...restOfUpdates } = request.body;
            const result = await schoolModel.update(restOfUpdates, request.currentSchool._id);
            if (!result) throw new HttpException(404, 'Something went wrong');
            const { affectedRows, changedRows, info } = result;
            const message = !affectedRows ? 'School User not found' :
                affectedRows && changedRows ? 'School User Password updated successfully' : 'Updated faild';
            response.send({ message, info });

            const url = `${CLIENT_URL}/`
            const subjectMail = 'Reset Password';
            const mailMessage = resetPasswordMail(url)
            sendMail({ to: request.currentSchool.owner_email, subject: subjectMail, text: mailMessage })

        } catch (error) {
            throw new HttpException(500, 'Something went wrong');
        }
    }


    getCurrentSchoolUser = async (request, response, next) => {
        const { password, ...userWithoutPassword } = request.currentSchool;
        response.send(userWithoutPassword);
    };

    updateSchoolUser = async (request, response, next) => {
        this.checkValidation(request);
        process.env.OTP_VERIFY = Math.random().toString().substr(2, 6)
        console.log(process.env.OTP_VERIFY)
        // // try {
        // // const newUpdateDetails = request.currentSchool;
        // const message = updateSchoolAuthMail(request.body.currentSchool.school_name, OTP_VERIFY, CONTACT_US, Date.now());
        // const subjectMail = 'Update Details'
        // sendMail({ to: request.body.owner_email, subject: subjectMail, text: message });
        // response.status(201).send('Check your email, verify to activation start.');
        // // } catch (error) {
        // //     throw new HttpException(500, 'Something went wrong');
        // // }
    }

    updateSchoolUserActivation = async (request, response, next) => {
        this.checkValidation(request);
        try {
            const { ...restOfUpdates } = request.body;
            const result = await schoolModel.update(restOfUpdates, request.currentSchool._id);
            if (!result) throw new HttpException(404, 'Something went wrong');
            const { affectedRows, changedRows, info } = result;
            const message = !affectedRows ? 'School User not found' :
                affectedRows && changedRows ? 'School User updated successfully' : 'Updated faild';
            response.send({ message, info });
            console.log(affectedRows)

        } catch (error) {
            throw new HttpException(500, 'Something went wrong');
        }
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
        return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '10m' })
    }

    createAccessToken = (payload) => {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' })
    }

}

module.exports = new authController()