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
  OPEN_AI_KEY,
} = require("../config");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const NotificationController = require("./NotificationController");
const Comment = require("../models/Comment");
const { Goal, KeyResult } = require("../models/Goals");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

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

  static getAiRecommendations = catchAsync(async (req, res, next) => {
    const { milestone } = req.body;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Human: ${milestone}\nAI:`,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [" Human:", " AI:"],
    });

    console.log(response);

    return HelperResponse.success(
      res,
      "Recommendations fetched successfully",
      response.data.choices[0].text
    );
  });
}

module.exports = CommentController;
