const express = require('express');
const { check } = require('express-validator');

const userController = require('../controllers/user.controllers');
const { authenticate, authorizeAdmin } = require('../middleware/checkAuth');

const router = express.Router();

// Public routes
router.post(
    '/signup',
    [
        check('firstName').not().isEmpty(),
        check('surname').not().isEmpty(),
        check('email').not().isEmpty(),
        check('password').isLength({ min: 6 }),
        check('jobTitle').not().isEmpty(),
    ],
    userController.signup
);

router.post('/login', userController.login);

// Routes that require authentication
router.get('/users', authenticate, userController.getAllUsers);
router.get('/user/:id', authenticate, userController.getUser);

// Routes that require admin authorization
router.delete('/user/:id', authenticate, authorizeAdmin, userController.deleteUser);
router.put('/user/:id', authenticate, authorizeAdmin, userController.updateUser);

module.exports = router;
