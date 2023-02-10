const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Team = require("../models/Team");
const joi = require("joi");
const CustomErrorHandler = require("../utils/CustomErrorHandler");
const HelperResponse = require("../utils/HelperResponse");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN, CHANGE_PASSWORD_URL } = require("../config");
const sendEmail = require("../utils/sendEmail");

class TeamController {
  static createTeam = catchAsync(async (req, res, next) => {
    const { name, description, department } = req.body;

    let joischema = joi.object({
      name: joi.string().min(3).max(30).required(),
      description: joi.string().min(3).required(),
      department: joi.string().required(),
    });

    let { error } = joischema.validate(req.body);

    if (error) {
      return next(new CustomErrorHandler(400, error.message));
    }

    const team = await Team.create({
      name,
      description,
      department,
    });

    return HelperResponse.success(res, "Team created successfully", team);
  });

  static getTeams = catchAsync(async (req, res, next) => {
    const teams = await Team.find();

    return HelperResponse.success(res, "Teams fetched successfully", teams);
  });

  static addMembers = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const { members } = req.body;

    let joischema = joi.object({
      members: joi.array().items(joi.string()).required(),
    });

    let { error } = joischema.validate(req.body);

    if (error) {
      return next(new CustomErrorHandler(400, error.message));
    }

    const team = await Team.findById(id);

    if (!team) {
      return next(new CustomErrorHandler(400, "Team not found"));
    }

    await User.updateMany(
      { _id: { $in: members } },
      {
        $set: {
          assigned_to_team: true,
          current_team: team._id,
        },
      }
    );

    team.members = members;

    await team.save();

    return HelperResponse.success(res, "Members added successfully", team);
  });

  static disableTeam = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const { status } = req.body;

    let joischema = joi.object({
      status: joi.boolean().required(),
    });

    let { error } = joischema.validate(req.body);

    if (error) {
      return next(new CustomErrorHandler(400, error.message));
    }

    const team = await Team.findById(id);

    if (!team) {
      return next(new CustomErrorHandler(400, "Team not found"));
    }

    team.is_active = status;

    await team.save();

    return HelperResponse.success(res, "Team statuc changed successfully", team);
  });

  static getTeam = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const team = await Team.findById(id).populate("members", "name email");

    if (!team) {
      return next(new CustomErrorHandler(400, "Team not found"));
    }

    return HelperResponse.success(res, "Team fetched successfully", team);
  });

  static assignLeader = catchAsync(async (req, res, next) => {
    const { id, leader_id } = req.params;

    const team = await Team.findById(id);

    if (!team) {
      return next(new CustomErrorHandler(400, "Team not found"));
    }

    let user = await User.findById(leader_id);

    if (!user) {
      return next(new CustomErrorHandler(400, "User not found"));
    }

    if (user.current_team != team._id) {
      return next(new CustomErrorHandler(400, "User is not in this team"));
    }

    team.leader = leader_id;

    await team.save();

    return HelperResponse.success(res, "Leader assigned successfully", team);
  });
}

module.exports = TeamController;
