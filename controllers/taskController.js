const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const Task = require("../models/tasksModel");
const User = require("../models/userModel");

// @desc    Get tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id.toString() });

  if (tasks.length) {
    res.status(200).json(tasks);
  } else {
    res.status(400).json({ Message: "No tasks found." });
  }
});

// @desc    New task
// @route   POST /api/task
// @access  Private
const addTask = asyncHandler(async (req, res) => {
  // console.log(req.user._id.toString())
  if (!req.body.description) {
    res.status(400);
    throw new Error("Please add a description field");
  }
  try {
    const task = await Task.create({
      description: req.body.description,
      user: req.user._id.toString(),
      title: req.body.title,
      finished: false,
    });
  } catch (e) {
    res.status(400).json({ message: `Error: ${e}.` });
  }

  res.status(200).json({ message: `Task succesfully added.` });
});

// @desc    Get single task
// @route   GET 
// @access  Private
const getTask = asyncHandler(async (req, res) => {
  // console.log(req.user._id.toString())
  let id = req.params.id;
  if (!id) {
    res.status(400);
    throw new Error("No task id present.");
  }
  try {
    const task = await Task.findById(id).exec();
    res.status(200).json(task);
  } catch (e) {
    res.status(400).json({ message: `Error: ${e}.` });
  }

  res.status(200).json({ message: `Task succesfully added.` });
});


// @desc    Update single task
// @route   PUT
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let finished = req.body?.finished;
  let title = req.body?.title;
  let description = req.body?.description
  let tags = req.body?.tags


  if (!id) {
    res.status(400);
    throw new Error("No task id present.");
  }
  try {
    const task = await Task.findOneAndUpdate(id)
    task.title = title || task.finished;
    task.finished = finished || task.finished;
    task.description = description || task.description;
    task.tags = tags || task.tags
    // console.log(`title: ${task.title}. finished: ${task.finished} ? . Description: ${task.description}`)
    await task.save({validateBeforeSave: false});

    res.status(200).json(task);
  } catch (e) {
    res.status(400).json({ message: `Error: ${e}.` });
  }

  res.status(200).json({ message: `Task succesfully updated.` });
});


module.exports = {
  getTasks,
  addTask,
  getTask,
  updateTask,
};
