const mongoose = require("mongoose");

const NotificationsSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    enum: ["team", "personal", "progress"],
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notifications = mongoose.model("Notifications", NotificationsSchema);
module.exports = Notifications;
