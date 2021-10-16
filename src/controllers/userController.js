const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const UserModel = require('../models/userModel');
const HttpException = require('../utils/HttpExceptionUtils');

const { otplibAuthenticator } = require("../config/otplib");

const { sendMail } = require("../config/sendMail");
const OTPMailMessage = require("../config/MailMessage/OTP");


class UserController {

    registerSendMail = async (request, response, next) => {
        this.checkValidation(request.body);
        try {
            const { school_email } = request.body;
            const schoolUserExists = await UserModel.findOne({ school_email });

            if (schoolUserExists) return response.status(400).json({
                success: false,
                errors: [{ message: "User already exists. Please login." }]
            });

            const otp = otplibAuthenticator.generate(school_email);
            const subject = `Verified OTP : ${otp}`;
            const message = OTPMailMessage(otp);

            try {

                sendMail({ to: school_email, subject: subject, text: message });
                return response.json({
                    success: true,
                    message: "OTP sent to your email. Please check your email."
                });

            } catch (error) {
                console.log(error)
                return response.status(500).json({
                    success: false,
                    errors: [{ message: "Send OTP has error." }]
                });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                errors: [{ message: "Internal server error" }]
            });
        }
    }

    registerVerifyOTP = async (request, response, next) => {
        this.checkValidation(request.body);
        try {
            const { owner_name, school_name, school_email, school_phone, address, city, region, country, password, OTP } = request.body;
            const schoolUserExists = await UserModel.findOne({ school_email });

            if (schoolUserExists) return response.status(400).json({
                success: false,
                errors: [{ message: "User already exists. Please login." }]
            });

            try {
                const isValid = otplibAuthenticator.verify({
                    token: otp,
                    secret: school_email
                });
    
                if (!isValid) {
                    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
                        success: false,
                        errors: [{ msg: "Invalid OTP. Please check OTP and try again." }]
                    });
                }

                return response.status(200).json({
                    success: true,
                    message: "OTP Verifed Successfully."
                });

            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    errors: [{ message: "Internal server error" }]
                });
            }
            


        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                errors: [{ message: "Internal server error" }]
            });
        }
    }

    // await this.hashPassword(req);
    // const result = await UserModel.create(req.body);
    // if (!result) throw new HttpException(500, 'Something went wrong');
    // return response.status(201).json({ success: 'User was created!' });
    // new HttpException(500, 'Something went wrong');


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

                const mailData = {
                    from: process.env.MAILGUN_FROM,
                    to: userExists.email,
                    subject: `Your OTP is ${otp}`,
                    text: `Your OTP for MERN Authentication is ${otp}`
                };

                try {
                    await mailgunHelper.messages().send(mailData);
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

            const mailData = {
                from: process.env.MAILGUN_FROM,
                to: user.email,
                subject: `Your OTP is ${otp}`,
                text: `Your OTP for MERN Authentication is ${otp}`
            };

            try {
                await mailgunHelper.messages().send(mailData);
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

    xxxverifyOtp = async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
                    success: false,
                    errors: errors.array()
                });
            }

            let { email, otp } = req.body;

            email = email.toLowerCase();

            const userExists = await User.findOne({ email });

            if (userExists && !userExists.verified) {
                const isValid = otplibAuthenticator.verify({
                    token: otp,
                    secret: userExists.email
                });

                if (!isValid) {
                    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
                        success: false,
                        errors: [{ msg: "Invalid OTP. Please check OTP and try again." }]
                    });
                }

                userExists.verified = true;

                await userExists.save();

                const jwtToken = jwt.sign(
                    { _id: String(userExists._id), email: userExists.email },
                    process.env.JWT_SECRET,
                    { expiresIn: "24h" }
                ); // expires in 24 hours

                return res.json({
                    success: true,
                    msg: "Registered successfully. Logged in successfully.",
                    user: userExists,
                    jwt: jwtToken
                });
            }

            if (userExists && userExists.verified) {
                return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
                    success: false,
                    errors: [{ msg: "User already exists. Please login." }]
                });
            }

            return res.status(HttpStatus.NOT_FOUND).json({
                success: false,
                errors: [{ msg: "User not found. Please signup." }]
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