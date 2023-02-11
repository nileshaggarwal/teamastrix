const mongoose = require("mongoose");

const keySchema = new mongoose.Schema({
  milestone: String,
  assigned_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  assigned_to_teams: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    default: null,
  },
  due_date_key: Date,
  type: {
    type: String,
    enum: ["percentage", "number", "currency"],
  },
  value: {
    type: Number,
    default: 0,
  },
  target_value: Number,
  linked_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "KeyResult",
    default: null,
  },
  created_by_key: {
    type: String,
    enum: ["manager", "teamLead", "self"],
  },
  created_by_id_key: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",

    default: null,
  },
  created_for_key: {
    type: String,
    enum: ["team", "member", "self"],
  },
});

const goalSchema = new mongoose.Schema({
  objective: {
    name: String,
    assigned_team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      default: null,
    },
    equal_percentage: Boolean,
    created_by: {
      type: String,
      enum: ["manager", "teamLead", "self"],
    },
    created_by_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    created_for: {
      type: String,
      enum: ["team", "member", "self"],
    },
    linked_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
      default: null,
    },
    target_value: Number,
    target_type: {
      type: String,
      enum: ["percentage", "number", "currency"],
    },
    value: {
      type: Number,
      default: 0,
    },

    due_date: Date,
  },
  key_results: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "KeyResult",
    },
  ],
});

const Goal = mongoose.model("Goal", goalSchema);
const KeyResult = mongoose.model("KeyResult", keySchema);

module.exports = { Goal, KeyResult };
