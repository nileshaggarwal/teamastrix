const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const joi = require("joi");
const CustomErrorHandler = require("../utils/CustomErrorHandler");
const HelperResponse = require("../utils/HelperResponse");
const jwt = require("jsonwebtoken");
const {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  CHANGE_PASSWORD_URL,
} = require("../config");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const NotificationController = require("./NotificationController");
const Comment = require("../models/Comment");
const { Goal, KeyResult } = require("../models/Goals");

class CommentController {
  static addComment = catchAsync(async (req, res, next) => {
    const { id } = req.user;

    const { comment, milestone } = req.body;

    let data = await Comment.create({
      comment,
      milestone,
      created_by: id,
    });

    return HelperResponse.success(res, "Comment created successfully", data);
  });

  static getAllComments = catchAsync(async (req, res, next) => {
    const { milestone } = req.params;

    let comments = await Comment.find({ milestone }).populate(
      "created_by",
      "name designation"
    );

    return HelperResponse.success(
      res,
      "Comments fetched successfully",
      comments
    );
  });
}

module.exports = CommentController;
