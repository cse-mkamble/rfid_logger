const express = require('express');
const router = express.Router();
const schoolAuthController = require('../controllers/schoolAuthController');
const auth = require('../middleware/authMiddleware');
const Status = require('../utils/schoolAuthStatusUtils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactoryMiddleware');

const { createSchoolAuthSchema, updateUserSchema, validateLogin } = require('../middleware/validators/schoolAuthValidatorMiddleware');

// router.get('/', auth(), awaitHandlerFactory(schoolAuthController.getAllUsers)); // localhost:8000/api/v1/users
// router.get('/id/:id', auth(), awaitHandlerFactory(schoolAuthController.getUserById)); // localhost:8000/api/v1/users/id/1
// router.get('/username/:username', auth(), awaitHandlerFactory(schoolAuthController.getUserByuserName)); // localhost:8000/api/v1/users/usersname/julia
// router.get('/myprofile', auth(), awaitHandlerFactory(schoolAuthController.getCurrentUser)); // localhost:8000/api/v1/users/myprofile
router.post('/', createSchoolAuthSchema, awaitHandlerFactory(schoolAuthController.store)); // localhost:8000/api/v1/users
// router.patch('/id/:id', auth(Role.Admin), updateUserSchema, awaitHandlerFactory(schoolAuthController.updateUser)); // localhost:8000/api/v1/users/id/1 , using patch for partial update
// router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(schoolAuthController.deleteUser)); // localhost:8000/api/v1/users/id/1


// router.post('/login', validateLogin, awaitHandlerFactory(schoolAuthController.userLogin)); // localhost:8000/api/v1/users/login

module.exports = router;