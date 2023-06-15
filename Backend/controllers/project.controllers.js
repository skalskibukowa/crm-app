const { validationResult } = require('express-validator');
const projectSchema = require('../models/project.models');


// getAll Project

const getAllProject = async (req, res, next) => {

    let projects;

    try {
        projects = await projectSchema.find({});
        res.status(201).json({message: 'Success!', projectDetails: projects})
    } catch(err) {
        res.status(500).json({message: 'Fetching projects failed, please try again later.'})
    }
}

// get Project

const getProject = async (req, res, next) => {

    try {
        const projectId = req.params.id;
        const project = await projectSchema.findById(projectId);

        // Added a return statement before sending the response in case of a 404 error, ensuring that the function exits afterward.
        if(!project) {
            return res.status(404).json({message: 'Project not found!'})
        }

        // payload Project
        const projectDetails = {
            projectName: project.projectName,
            projectImage: project.projectImage,
            clientName: project.projectDetails.clientName,
            address: project.projectDetails.address,
            industries: project.projectDetails.industries,
            size: project.projectDetails.size,
            contactPerson: project.projectDetails.contactPerson
        }

        res.status(200).json({message: 'Success!', project: projectDetails});
    } catch (err) {
        res.status(500).json({message: 'Something went wrong, try again later!'})
    }
}

// update Project

const updateProject = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const projectUpdate = await projectSchema.findByIdAndUpdate(projectId, req.body, { new: true });

        if(!projectUpdate) {
            return res.status(404).json({message: "Project doesn't exist"})
        }

        res.status(200).json({message: 'Project has been updated', project: projectUpdate})
    } catch(err) {
        res.status(500).json({message: "Something went wrong, try again later!"})
    }
}
    
// delete Project

const deleteProject = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const deleteProject = await projectSchema.findByIdAndDelete(projectId);

        if(!deleteProject) {
            res.status(400).json({message: "Project doesn't exist"})
        }
        
        res.status(200).json({message: 'Success! Project has been removed!', project: deleteProject})
    } catch (err) {
        res.status(500).json({message: "Something went wrong, try again later!"})
    }
}

// create Project

const createProject = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.status(422).json({message: "Invalid inputs passed, please check you data."})
    }

    // object destructor
    
    const { projectName, projectImage, clientName, address, industries, size, contactPerson } = req.body;

    let existingProject;

    try {
        existingProject = await projectSchema.findOne({ projectName: projectName});
    } catch (err) {
        res.status(500).json({message: 'Signing up failed, please try again later.'})
    }

    if(existingProject) {
        res.status(422).json({message: 'Project already exists'})
    }

    const projectDetails = {
        clientName,
        address,
        industries,
        size,
        contactPerson
    };

    const createdProject = new projectSchema({
        projectName,
        projectImage,
        projectDetails
    })

    try {
        await createdProject.save();
        res.status(201).json({message: 'Project created successfully.', project: createdProject} )
    } catch (err) {
        res.status(500).json({message: 'Signing up failed, please try again later.'})   
    }
}

exports.getAllProject = getAllProject;
exports.getProject = getProject;
exports.deleteProject = deleteProject;
exports.updateProject = updateProject;
exports.createProject = createProject;



