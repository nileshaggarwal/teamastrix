const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  department: {
    type: String,
  },
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
