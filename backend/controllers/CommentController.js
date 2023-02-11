const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const joi = require("joi");
const CustomErrorHandler = require("../utils/CustomErrorHandler");
const HelperResponse = require("../utils/HelperResponse");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN, CHANGE_PASSWORD_URL, OPEN_AI_KEY } = require("../config");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const NotificationController = require("./NotificationController");
const Comment = require("../models/Comment");
const { Goal, KeyResult } = require("../models/Goals");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: OPEN_AI_KEY,
});

class CommentController {
  static addComment = catchAsync(async (req, res, next) => {
    const { id } = req.user;

    const { comment, milestone } = req.body;

    let Key_Result = await KeyResult.findOne({ _id: milestone });

    let data = await Comment.create({
      comment,
      milestone,
      created_by: id,
    });

    if (Key_Result.assigned_to) {
      await NotificationController.create(
        id,
        Key_Result.assigned_to,
        "personal",
        `You have a new comment on ${Key_Result.milestone.slice(0, 10) + "..."}`,
        "Check your tasks now"
      );
    }

    return HelperResponse.success(res, "Comment created successfully", data);
  });

  static getAllComments = catchAsync(async (req, res, next) => {
    const { milestone } = req.params;

    let comments = await Comment.find({ milestone }).populate("created_by", "name designation");

    return HelperResponse.success(res, "Comments fetched successfully", comments);
  });

  static getAiRecommendations = catchAsync(async (req, res, next) => {
    const { milestone } = req.body;

    console.log(milestone);

    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Human: ${milestone} AI:`,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });

    console.log(response.data);

    return HelperResponse.success(
      res,
      "Recommendations fetched successfully",
      response.data.choices[0].text
    );
  });
}

module.exports = CommentController;
