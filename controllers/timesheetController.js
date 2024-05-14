const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Timesheet = require("../models/timesheetModel");

const getTimesheets = asyncHandler(async (req, res) => {
  const timesheets = await Timesheet.find({ user: req.user._id.toString() });

  if (timesheets.length) {
    res.status(200).json(timesheets);
  } else {
    res.status(400).json({ Message: "No timesheets found" });
  }
});

const addTimesheet = asyncHandler(
  async (req, res, userId, projectId, weekStartDate, dailyHours) => {
    if (!req.body.project) {
      res.status(400);
      throw new Error("Please bring the project ID");
    }

    const daysOfWeek = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];
    for (let i = 0; i < daysOfWeek.length; i++) {
      if (!dailyHours[i] || dailyHours[i].day !== daysOfWeek[i]) {
        throw new Error(
          `dailyHours array must contain an entry for each day of the week in order.`
        );
      }
    }

    const totalHours = dailyHours.reduce(
      (total, day) => total + day.hoursWorked,
      0
    );

    try {
      const timesheet = await Timesheet.create({
        user: userId,
        project: projectId,
        weekStartDate: new Date(weekStartDate),
        hours: dailyHours,
        totalHours: totalHours,
      });
      return timesheet;
    } catch (error) {
      console.error("Error creating timesheet:", error);
      throw error;
    }
  }
);

module.exports = {
  getTimesheets,
  addTimesheet,
};
