const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const UserModel = require('../models/userModel');
const HttpException = require('../utils/HttpExceptionUtils');

const { otplibAuthenticator } = require("../config/otplib");
const { sendMail } = require("../config/sendMail");


class UserController {

    registerSendMail = async (request, response, next) => {
        this.checkValidation(request.body);
        try {
            const { owner_name, school_name, school_email, school_phone, address, city, region, country, password } = request.body;
            const schoolUserExists = await UserModel.findOne({ school_email });
            if (!schoolUserExists) {
                const otp = otplibAuthenticator.generate(school_email);
                const subject = `Your OTP is ${otp}`;

                console.log(otp)
            }

        } catch (error) {
            return response.status(500).json({ error: error });
        }
        // await this.hashPassword(req);
        // const result = await UserModel.create(req.body);
        // if (!result) throw new HttpException(500, 'Something went wrong');
        // return response.status(201).json({ success: 'User was created!' });
        // new HttpException(500, 'Something went wrong');

    }


    signup = async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
                    success: false,
                    errors: errors.array()
                });
            }

            let { email, password } = req.body;

            email = email.toLowerCase();

            const userExists = await User.findOne({ email });

            if (userExists && !userExists.verified) {
                const otp = otplibAuthenticator.generate(userExists.email);
                const subjectMail = `Your OTP is ${otp}`
                const message = mailMessage(`<div>Your OTP for MERN Authentication is ${otp}</div>`)
                try {
                    sendMail({ to: userExists.email, subject: subjectMail, text: message });
                } catch (err) {
                    console.log(err);
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        success: false,
                        errors: [
                            {
                                msg: "User created but unable to send OTP to this email."
                            }
                        ]
                    });
                }

                return res.json({
                    success: true,
                    msg: "User already exists. OTP sent to your email.",
                    userExists
                });
            }

            if (userExists && userExists.verified) {
                return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
                    success: false,
                    errors: [{ msg: "User already exists. Please login." }]
                });
            }

            password = await bcrypt.hash(password, saltRounds);

            const user = await User.create({ email, password });

            const otp = otplibAuthenticator.generate(user.email);
            const subjectMail = `Your OTP is ${otp}`
            const message = mailMessage(`<div>Your OTP for MERN Authentication is ${otp}</div>`)

            try {
                sendMail({ to: user.email, subject: subjectMail, text: message });
            } catch (err) {
                console.log(err);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    errors: [
                        {
                            msg: "User created but unable to send OTP to this email."
                        }
                    ]
                });
            }

            return res.json({
                success: true,
                msg: "User created successfully. OTP sent to your email.",
                user
            });
        } catch (err) {
            console.log(err);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                errors: [{ msg: "Internal server error" }]
            });
        }
    };

    checkValidation = (request) => {
        const errors = validationResult(request)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

}

module.exports = new UserController;