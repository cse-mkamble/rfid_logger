const { body } = require('express-validator');
const Status = require('../../utils/schoolAuthStatusUtils');


exports.createSchoolAuthSchema = [
    body('owner_name')
        .exists()
        .withMessage('Your name is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('owner_email')
        .exists()
        .withMessage('Your Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('owner_phone')
        .exists()
        .withMessage('Your phone number is required')
        .notEmpty()
        .isLength({ min: 10 })
        .withMessage('Must be at least 10 chars long'),
    body('school_name')
        .exists()
        .withMessage('School name is required')
        .notEmpty(),
    body('school_email')
        .exists()
        .withMessage('Your Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('school_phone')
        .exists()
        .withMessage('School phone number is required')
        .notEmpty()
        .isLength({ min: 10 })
        .withMessage('Must be at least 10 chars long'),
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage('Password must contain at least 8 characters')
        .isLength({ max: 16 })
        .withMessage('Password can contain max 16 characters'),
    body('confirm_password')
        .exists()
        .custom((value, { req }) => value === req.body.password)
        .withMessage('confirm_password field must have the same value as the password field'),
    body('address')
        .exists()
        .withMessage('Address is required')
        .notEmpty(),
    body('city')
        .exists()
        .withMessage('city is required')
        .notEmpty(),
    body('state')
        .exists()
        .withMessage('state is required')
        .notEmpty(),
    body('country')
        .exists()
        .withMessage('country is required')
        .notEmpty(),
    body('status')
        .optional()
        .isIn([Status.Active, Status.InActive])
        .withMessage('Invalid Status type'),

];

// exports.updateUserSchema = [
//     body('username')
//         .optional()
//         .isLength({ min: 3 })
//         .withMessage('Must be at least 3 chars long'),
//     body('first_name')
//         .optional()
//         .isAlpha()
//         .withMessage('Must be only alphabetical chars')
//         .isLength({ min: 3 })
//         .withMessage('Must be at least 3 chars long'),
//     body('last_name')
//         .optional()
//         .isAlpha()
//         .withMessage('Must be only alphabetical chars')
//         .isLength({ min: 3 })
//         .withMessage('Must be at least 3 chars long'),
//     body('email')
//         .optional()
//         .isEmail()
//         .withMessage('Must be a valid email')
//         .normalizeEmail(),
//     body('role')
//         .optional()
//         .isIn([Role.Admin, Role.SuperUser])
//         .withMessage('Invalid Role type'),
//     body('password')
//         .optional()
//         .notEmpty()
//         .isLength({ min: 6 })
//         .withMessage('Password must contain at least 6 characters')
//         .isLength({ max: 10 })
//         .withMessage('Password can contain max 10 characters')
//         .custom((value, { req }) => !!req.body.confirm_password)
//         .withMessage('Please confirm your password'),
//     body('confirm_password')
//         .optional()
//         .custom((value, { req }) => value === req.body.password)
//         .withMessage('confirm_password field must have the same value as the password field'),
//     body('age')
//         .optional()
//         .isNumeric()
//         .withMessage('Must be a number'),
//     body()
//         .custom(value => {
//             return !!Object.keys(value).length;
//         })
//         .withMessage('Please provide required field to update')
//         .custom(value => {
//             const updates = Object.keys(value);
//             const allowUpdates = ['username', 'password', 'confirm_password', 'email', 'role', 'first_name', 'last_name', 'age'];
//             return updates.every(update => allowUpdates.includes(update));
//         })
//         .withMessage('Invalid updates!')
// ];

exports.validateLogin = [
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled')
];