const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  objective: {
    name: String,
    assigned_team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    equal_percentage: Boolean,
    created_by: {
      type: String,
      enum: ["manager", "teamLead"],
    },
    linked_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
    },
  },
  key_results: [
    {
      milestone: String,
      assigned_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      assigned_team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
      type: {
        type: String,
        enum: ["percentage", "number", "currency"],
      },
      value: String,
    },
  ],
});

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
