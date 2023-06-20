const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const projectSchema = require('../models/project.models');
const UserSchema = require('../models/user.models');

// getAll Project
const getAllProject = async (req, res) => {
    try {
        const projects = await projectSchema.find({});
        return res
            .status(200)
            .json({ message: 'Success!', projectDetails: projects });
    } catch (err) {
        return res.status(500).json({
            message: 'Fetching projects failed, please try again later.',
        });
    }
};

// get Project
const getProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await projectSchema.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found!' });
        }

        const projectDetails = {
            projectName: project.projectName,
            projectImage: project.projectImage,
            clientName: project.projectDetails.clientName,
            address: project.projectDetails.address,
            industries: project.projectDetails.industries,
            size: project.projectDetails.size,
            contactPerson: project.projectDetails.contactPerson,
        };

        return res
            .status(200)
            .json({ message: 'Success!', project: projectDetails });
    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Something went wrong, try again later!' });
    }
};

// update Project
const updateProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const projectUpdate = await projectSchema.findByIdAndUpdate(
            projectId,
            req.body,
            { new: true },
        );

        if (!projectUpdate) {
            return res.status(404).json({ message: "Project doesn't exist" });
        }

        return res.status(200).json({
            message: 'Project has been updated',
            project: projectUpdate,
        });
    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Something went wrong, try again later!' });
    }
};

// delete Project
const deleteProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const deleteProject = await projectSchema.findByIdAndDelete(projectId);

        if (!deleteProject) {
            return res.status(400).json({ message: "Project doesn't exist" });
        }

        return res.status(200).json({
            message: 'Success! Project has been removed!',
            project: deleteProject,
        });
    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Something went wrong, try again later!' });
    }
};

// Create a new project
const createProject = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Invalid inputs passed, please check your data.',
            errors: errors.array(),
        });
    }

    const {
        projectName,
        projectImage,
        clientName,
        address,
        industries,
        size,
        contactPerson,
        AssignedUser,
    } = req.body;

    try {
        const existingProject = await projectSchema.findOne({ projectName });
        if (existingProject) {
            return res.status(422).json({ message: 'Project already exists.' });
        }

        const createdProject = new projectSchema(req.body);

        const user = await UserSchema.findById(AssignedUser);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const session = await mongoose.startSession();
        session.startTransaction();
        await createdProject.save({ session });
        user.AssignedProject.push(createdProject);
        await user.save({ session });
        await session.commitTransaction();

        return res.status(201).json({
            message: 'Project created successfully.',
            project: createdProject,
        });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ message: 'Creating project failed, please try again.' });
    }
};

exports.getAllProject = getAllProject;
exports.getProject = getProject;
exports.deleteProject = deleteProject;
exports.updateProject = updateProject;
exports.createProject = createProject;
