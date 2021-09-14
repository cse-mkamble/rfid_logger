const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const Role = require('../utils/userRolesUtils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactoryMiddleware');

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidatorMiddleware');

router.get('/', auth(), awaitHandlerFactory(userController.getAllUsers)); // localhost:8000/api/v1/users
router.get('/id/:id', auth(), awaitHandlerFactory(userController.getUserById)); // localhost:8000/api/v1/users/id/1
router.get('/username/:username', auth(), awaitHandlerFactory(userController.getUserByuserName)); // localhost:8000/api/v1/users/usersname/julia
router.get('/myprofile', auth(), awaitHandlerFactory(userController.getCurrentUser)); // localhost:8000/api/v1/users/myprofile
router.post('/', createUserSchema, awaitHandlerFactory(userController.createUser)); // localhost:8000/api/v1/users
router.patch('/id/:id', auth(Role.Admin), updateUserSchema, awaitHandlerFactory(userController.updateUser)); // localhost:8000/api/v1/users/id/1 , using patch for partial update
router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(userController.deleteUser)); // localhost:8000/api/v1/users/id/1


router.post('/login', validateLogin, awaitHandlerFactory(userController.userLogin)); // localhost:8000/api/v1/users/login

module.exports = router;