const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["manager", "employee"],
  },
  department: {
    type: String,
  },
  assigned_to_team: {
    type: Boolean,
    default: false,
  },
  current_team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    default: null,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
