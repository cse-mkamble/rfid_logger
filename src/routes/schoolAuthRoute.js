const express = require('express');
const router = express.Router();
const schoolAuthController = require('../controllers/schoolAuthController');
const auth = require('../middleware/authMiddleware');
const Status = require('../utils/schoolAuthStatusUtils');
const Role = require('../utils/schoolAuthRoleUtils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactoryMiddleware');

const { createSchoolAuthSchema, updateSchoolAuthSchema, validateSignin, updateSchoolAuthPasswordSchema } = require('../middleware/validators/schoolAuthValidatorMiddleware');

// school User Route
router.post('/signup', createSchoolAuthSchema, awaitHandlerFactory(schoolAuthController.signup)); // localhost:8000/api/v1/school/signup
router.post('/activation', createSchoolAuthSchema, awaitHandlerFactory(schoolAuthController.activation)); // localhost:8000/api/v1/school/activation
router.post('/signin', validateSignin, awaitHandlerFactory(schoolAuthController.signin)); // localhost:8000/api/v1/school/signin
router.post('/forgotpassword', awaitHandlerFactory(schoolAuthController.forgotPassword)); // localhost:8000/api/v1/school/forgotpassword
router.patch('/resetpassword', auth(), updateSchoolAuthPasswordSchema, awaitHandlerFactory(schoolAuthController.resetPassword)); // localhost:8000/api/v1/school/resetpassword
router.get('/infor', auth(), awaitHandlerFactory(schoolAuthController.getCurrentSchoolUser)); // localhost:8000/api/v1/school/infor

// router.get('/', auth(), awaitHandlerFactory(schoolAuthController.getAllUsers)); // localhost:8000/api/v1/school
// router.get('/id/:id', auth(), awaitHandlerFactory(schoolAuthController.getUserById)); // localhost:8000/api/v1/school/id/1
// router.get('/username/:username', auth(), awaitHandlerFactory(schoolAuthController.getUserByuserName)); // localhost:8000/api/v1/school/schoolname/julia
// router.get('/myprofile', auth(), awaitHandlerFactory(schoolAuthController.getCurrentUser)); // localhost:8000/api/v1/school/myprofile
// router.patch('/id/:id', auth(Role.Admin), updateUserSchema, awaitHandlerFactory(schoolAuthController.updateUser)); // localhost:8000/api/v1/school/id/1 , using patch for partial update
// router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(schoolAuthController.deleteUser)); // localhost:8000/api/v1/school/id/1

// Admin Route

module.exports = router;