const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Team = require("../models/Team");
const Goal = require("../models/Goals");
const joi = require("joi");
const CustomErrorHandler = require("../utils/CustomErrorHandler");
const HelperResponse = require("../utils/HelperResponse");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN, CHANGE_PASSWORD_URL } = require("../config");
const sendEmail = require("../utils/sendEmail");
const Notifications = require("../models/Notifications");

class NotificationController {
  static create = async (sender, receiver, type, title, content) => {
    const notification = await Notifications.create({
      sender,
      receiver,
      type,
      title,
      content,
    });

    return notification;
  };

  static getNotifications = catchAsync(async (req, res, next) => {
    const { role, id } = req.user;

    console.log(id, role);

    let notifications = await Notifications.find({ receiver: id })
      .populate("sender", "name role")
      .populate("receiver", "name role")
      .sort({ createdAt: -1 });

    return HelperResponse.success(res, "Notifications", notifications);
  });
}

module.exports = NotificationController;
