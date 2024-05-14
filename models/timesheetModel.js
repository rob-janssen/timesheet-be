const mongoose = require("mongoose");

const timesheetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  weekStartDate: {
    type: Date,
    required: true,
  },
  hours: {
    type: [
      {
        day: {
          type: String,
          enum: [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
          ],
          required: true,
        },
        hoursWorked: {
          type: Number,
          required: true,
          min: 0,
          default: 0,
        },
      },
    ],
    validate: {
      validator: function (v) {
        return v.length === 7;
      },
      message: (props) => `${props.value} does not have 7 entries.`,
    },
    required: true,
  },
  totalHours: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

timesheetSchema.pre("save", function (next) {
  this.totalHours = this.hours.reduce(
    (total, day) => total + day.hoursWorked,
    0
  );
  this.updatedAt = Date.now();
  next();
});

const Timesheet = mongoose.model("Timesheet", timesheetSchema);

module.exports = Timesheet;
