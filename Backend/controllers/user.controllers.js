const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = require('../models/user.models');

// Get all users
const getAllUsers = async (req, res) => {
    let users;

    try {
        // print details about user, without password
        users = await UserSchema.find({}, '-password');
    } catch (err) {
        return res.status(500).json({
            message: 'Fetching users failed, please try again later.',
        });
    }
    //res.json({ userAll: users.map(user => user.toObject({ getters: true}))});
    return res.json({ UsersDetails: users });
};

// Get user

const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await UserSchema.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        // payload userDetails
        const userDetails = {
            firstName: user.firstName,
            surname: user.surname,
            email: user.email,
            jobTitle: user.jobTitle,
            image: user.image,
        };

        return res.status(200).json({ message: 'Success!', user: userDetails });
    } catch (err) {
        if (!err.statusCode) {
            return res
                .status(500)
                .json({ message: 'Something went wrong, try again later!' });
        }
    }
};

// Delete user

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deleteUser = await UserSchema.findByIdAndDelete(userId);

        if (!deleteUser) {
            return res.status(400).json({ message: "User doesn't exists" });
        }

        return res.status(200).json({
            message: 'Success! User has been removed!',
            deleteUser: deleteUser,
        });
    } catch (err) {
        if (!err.statusCode) {
            return res
                .status(500)
                .json({ message: 'Something went wrong, try again later!' });
        }
    }
};

// Update user

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const UpdateUser = await UserSchema.findByIdAndUpdate(
            userId,
            req.body,
            { new: true },
        ); // an optional third parameter that specifies that you want to receive the updated user information in the response instead of the old information

        if (!UpdateUser) {
            res.status(404).json({ message: "User doesn't exists" });
        }

        res.status(200).json({
            message: 'User has been updated',
            UpdateUser: UpdateUser,
        });
    } catch (err) {
        if (!err.statusCode) {
            res.status(500).json({
                message: 'Something went wrong, try again later!',
            });
        }
    }
};

// Create user

const signup = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Invalid inputs passed, please check your data.',
        });
    }

    // object desctructor
    const {
        firstName,
        surname,
        email,
        password,
        jobTitle,
        image,
        assignedProject,
    } = req.body;

    let existingUser;

    try {
        existingUser = await UserSchema.findOne({ email: email });
    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Signing up failed, please try again later.' });
    }

    // Validation if the user exists
    // If the user exists, there should be an error
    if (existingUser) {
        return res
            .status(422)
            .json({ message: 'User already exists, please login instead.' });
    }

    // Password - hashPassword
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Could not create user, please try again.' });
    }
    // Adding a new user
    const createdUser = new UserSchema({
        firstName,
        surname,
        email,
        password: hashedPassword,
        jobTitle,
        image, //,
        //AssignedProject: []
    });

    try {
        await createdUser.save();
    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Signing up failed, please try again later.' });
    }

    // Create token with a 1-hour expiration
    let token;
    try {
        token = jwt.sign(
            { userId: createdUser.id, email: createdUser.email, role: createdUser.userRole },
            process.env.JWT_Password, // 'supersecret DO NOT share'
            { expiresIn: '1h' },
        );
    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Signing up failed, please try again later.' });
    }

    return res.status(201).json({
        userId: createdUser.id,
        email: createdUser.email,
        userRole: createdUser.userRole,
        token: token,
    });
};

// Login User

const login = async (req, res) => {
    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await UserSchema.findOne({ email: email });
    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Logging in failed, please try again later.' });
    }

    // Validation if the user is registered if not then Error
    if (!existingUser) {
        return res
            .status(403)
            .json({ message: 'Invalid credentials, could not log you in.' });
    }

    // Validation password correctness

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        return res.status(500).json({
            message:
                'Could not log you in, please check your credentials and try again.',
        });
    }

    if (!isValidPassword) {
        return res
            .status(403)
            .json({ message: 'Invalid credentials, could not log you in.' });
    }

    let token;
    try {
        token = jwt.sign(
            { userId: existingUser.id, email: existingUser.email, userRole: existingUser.userRole },
            process.env.JWT_Password, // 'supersecret DO NOT share'
            { expiresIn: '1h' },
        );
    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Signing up failed, please try again later.' });
    }
    return res.status(201).json({
        userId: existingUser.id,
        email: existingUser.email,
        userRole: existingUser.userRole,
        token: token,
    });
};

exports.getAllUsers = getAllUsers;
exports.getUser = getUser;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;

exports.signup = signup;
exports.login = login;
