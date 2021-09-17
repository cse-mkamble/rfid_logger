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

exports.validateSignin = [
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
        .withMessage('Password must be filled')
];

exports.updateSchoolAuthPasswordSchema = [
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
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['password', 'confirm_password'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

exports.updateSchoolAuthSchema = [
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
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['owner_name', 'owner_email', 'owner_phone', 'school_name', 'address', 'city', 'state', 'country'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

exports.validateOwnerEmail = [
    body('owner_email')
        .exists()
        .withMessage('Your Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail()
];