const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Team = require("../models/Team");
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
const NotificationController = require("./NotificationController");
const { Goal } = require("../models/Goals");

class TeamController {
  static createTeam = catchAsync(async (req, res, next) => {
    const { name, description, members, leader } = req.body;

    const { id } = req.user;

    let joischema = joi.object({
      name: joi.string().min(3).max(30).required(),
      description: joi.string().min(3).required(),
      members: joi.array().items(joi.string()).required(),
      leader: joi.string().required(),
    });

    let { error } = joischema.validate(req.body);

    if (error) {
      return next(new CustomErrorHandler(400, error.message));
    }

    const team = await Team.create({
      name,
      description,
      members,
      leader,
    });

    await User.updateMany(
      { _id: { $in: members } },
      {
        $set: {
          assigned_to_team: true,
          current_team: team._id,
        },
      }
    );

    for (let i = 0; i < members.length; i++) {
      await NotificationController.create(
        id,
        members[i],
        "team",
        `You have been added to ${name} team`,
        "Check your tasks now"
      );
    }

    await NotificationController.create(
      id,
      leader,
      "team",
      `You have been made leader of ${name} team`,
      "Assign tasks now!"
    );

    return HelperResponse.success(res, "Team created successfully", team);
  });

  static getTeams = catchAsync(async (req, res, next) => {
    let teams = await Team.find().lean();

    return HelperResponse.success(res, "Teams fetched successfully", teams);
  });

  // static addMembers = catchAsync(async (req, res, next) => {
  //   const { id } = req.params;

  //   const { members } = req.body;

  //   let joischema = joi.object({
  //     members: joi.array().items(joi.string()).required(),
  //   });

  //   let { error } = joischema.validate(req.body);

  //   if (error) {
  //     return next(new CustomErrorHandler(400, error.message));
  //   }

  //   const team = await Team.findById(id);

  //   if (!team) {
  //     return next(new CustomErrorHandler(400, "Team not found"));
  //   }

  //   await User.updateMany(
  //     { _id: { $in: members } },
  //     {
  //       $set: {
  //         assigned_to_team: true,
  //         current_team: team._id,
  //       },
  //     }
  //   );

  //   team.members = members;

  //   await team.save();

  //   return HelperResponse.success(res, "Members added successfully", team);
  // });

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

    return HelperResponse.success(
      res,
      "Team status changed successfully",
      team
    );
  });

  static getTeam = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const team = await Team.findById(id)
      .populate("members", "name email designation")
      .populate("leader", "name email designation")
      .lean();

    if (!team) {
      return next(new CustomErrorHandler(400, "Team not found"));
    }

    return HelperResponse.success(res, "Team fetched successfully", team);
  });

  static getAllTeams = catchAsync(async (req, res, next) => {
    const team = await Team.find({}).populate("members", "name email");

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

  static updateTeam = catchAsync(async (req, res, next) => {
    let { id } = req.params;

    const { name, description, members } = req.body;

    let team = await Team.findById(id);

    if (!team) {
      return next(new CustomErrorHandler(400, "Team not found"));
    }

    team.name = name;
    team.description = description;
    team.members = members;

    await team.save();

    await User.updateMany(
      { _id: { $in: members } },
      {
        $set: {
          assigned_to_team: true,
          current_team: team._id,
        },
      }
    );

    return HelperResponse.success(res, "Team updated successfully", team);
  });

  static generateHeatMap = catchAsync(async (req, res, next) => {
    let teams = await Team.find({}).lean();
    console.log(teams.length);
    for (let i = 0; i < teams.length; i++) {
      let team_id = teams[i]._id;

      let teamGoals = await Goal.find({
        "objective.assigned_team": team_id,
      });
      console.log(teamGoals.length);
      let total = 0;
      teamGoals.map(async (goal) => {
        total = (goal.objective.value / goal.objective.target_value) * 100;
      });
      console.log(total);
      total = total / teamGoals.length;
      teams[i]["heat_map"] = total;
    }
    return HelperResponse.success(res, "Team fetched successfully", teams);
  });

  static getTeamByLeader = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    let team = await Team.findOne({ leader: id }).populate("members").lean();

    if (!team) {
      return next(new CustomErrorHandler(400, "Team not found"));
    }

    return HelperResponse.success(res, "Team fetched successfully", team);
  });
}

module.exports = TeamController;
