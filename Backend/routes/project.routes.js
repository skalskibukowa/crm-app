const express = require("express");
const { check } = require("express-validator");

const projectController = require("../controllers/project.controllers");

const router = express.Router();

router.get("/projects", projectController.getAllProject);
router.get("/project/:id", projectController.getProject);
router.delete("/project/:id", projectController.deleteProject);
router.put("/project/:id", projectController.updateProject);

router.post("/newProject", 
  [
    check("projectName").not().isEmpty(),
    check("projectImage").not().isEmpty(),
    check("clientName").not().isEmpty(),
    check("address").not().isEmpty(),
    check("industries").not().isEmpty(),
    check("size").not().isEmpty(),
    check("contactPerson").not().isEmpty()
  ],
  projectController.createProject
)

module.exports = router;