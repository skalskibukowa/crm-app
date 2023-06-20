const express = require('express');
const { check } = require('express-validator');

const userController = require('../controllers/user.controllers');
const checkAuth = require('../../Backend/middleware/checkAuth');

const router = express.Router();

router.post(
    '/signup',
    [
        check('firstName').not().isEmpty(),
        check('surname').not().isEmpty(),
        check('email').not().isEmpty(),
        check('password').isLength({ min: 6 }),
        check('jobTitle').not().isEmpty(),
    ],
    userController.signup,
);

router.post('/login', userController.login);

router.use(checkAuth);

router.get('/users', userController.getAllUsers);
router.get('/user/:id', userController.getUser);
router.delete('/user/:id', userController.deleteUser);
router.put('/user/:id', userController.updateUser);

module.exports = router;
