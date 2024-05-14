const express = require("express");
const router = express.Router();

const { getProjects, addProject } = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");

router.route("/")
.get(protect, getProjects)
.post(protect, addProject)

module.exports = router;
