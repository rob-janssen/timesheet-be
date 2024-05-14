const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Project = require("../models/projectModel");

const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ user: req.user._id.toString() });
  if (projects.length) {
    res.status(200).json(projects);
  } else {
    res.status(400).json({ Message: "No projects found." });
  }
});

const addProject = asyncHandler(async (req, res) => {
    try {
        const project = await Project.create({
            user: req.user._id.toString(),
            company: req.body.company,
            description: req.body.description
        })
    } catch (e) {
        res.status(400).json({ Message: `Error ${e}.`})
    }
    res.status(200).json({ Message: 'Task succesfully added.'})
})

module.exports = {
  getProjects,
  addProject
};
