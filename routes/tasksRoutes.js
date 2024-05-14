const express = require("express");
const router = express.Router();

const {
  getTasks,
  addTask,
  getTask,
  updateTask,
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getTasks).post(protect, addTask);

router.route("/:id").get(protect, getTask).put(protect, updateTask);

module.exports = router;
