const express = require("express");
const router = express.Router();

const {
  getTimesheets,
  addTimesheet,
} = require("../controllers/timesheetController");
const { protect } = require("../middleware/authMiddleware");

router.route("/")
.get(protect, getTimesheets)
.post(protect, addTimesheet);

module.exports = router;
