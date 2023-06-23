const express = require('express');
const { check } = require('express-validator');

const projectController = require('../controllers/project.controllers');
const { authenticate } = require('../middleware/checkAuth');

// Variable path

const clientName = 'projectDetails.0.clientName';
const address = 'projectDetails.0.address';
const industries = 'projectDetails.0.industries';
const size = 'projectDetails.0.size';
const contactPerson = 'projectDetails.0.contactPerson';
const projectName = 'projectName';
const projectImage = 'projectImage';

const router = express.Router();

// Routes that require authentication
router.get('/projects', authenticate, projectController.getAllProject);
router.get('/project/:id', authenticate, projectController.getProject);
router.delete('/project/:id', authenticate, projectController.deleteProject);
router.put('/project/:id', authenticate, projectController.updateProject);

router.post(
    '/newProject',
    authenticate,
    [
        check(projectName).not().isEmpty(),
        check(projectImage).not().isEmpty(),
        check(clientName).not().isEmpty(),
        check(address).not().isEmpty(),
        check(industries).not().isEmpty(),
        check(size).isNumeric(),
        check(contactPerson).not().isEmpty(),
    ],
    projectController.createProject,
);

module.exports = router;
