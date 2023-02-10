const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Team = require("../models/Team");
const { Goal, KeyResult } = require("../models/Goals");
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

class GoalController {
  static addObjective = catchAsync(async (req, res, next) => {
    console.log("called");
    const {
      name,
      assigned_team,
      equal_percentage,
      created_by,
      created_by_id,

      linked_to,
      target_type,
      target_value,
      due_date,
    } = req.body;
    console.log(req.body, "req.body");
    let joischema = joi.object({
      name: joi.string().min(3).max(30),
      assigned_team: joi.string(),
      created_by_id: joi.string(),
      created_for: joi.string(),
      equal_percentage: joi.boolean(),
      created_by: joi.string().allow("manager", "teamLead", "self"),
      linked_to: joi.string(),
      target_value: joi.string(),
      target_type: joi
        .string()
        .allow("percentage", "number", "currency")
        .required(),
      due_date: joi.date(),
    });
    console.log(req.body, "body 2");

    let { error } = joischema.validate(req.body);

    if (error) {
      return next(new CustomErrorHandler(400, error.message));
    }

    // let isTeamExist = await Team.findById(assigned_team);

    // if (!isTeamExist || isTeamExist.is_active === false) {
    //   return next(new CustomErrorHandler(400, "Team not found"));
    // }

    const goal = await Goal.create({
      objective: {
        name,
        assigned_team,
        equal_percentage,
        created_by,
        created_by_id,
        linked_to,
        target_type,
        target_value,
        due_date,
      },
    });

    return HelperResponse.success(res, "Objective created successfully", goal);
  });

  static addKeyResult = catchAsync(async (req, res, next) => {
    const {
      milestone,
      assigned_to,
      assigned_to_teams,
      due_date_key,
      type,
      value,
      target_value,
      linked_to,
      created_by_key,
      created_by_id_key,
      created_for_key,
    } = req.body;
    const id = req.params.id;
    console.log(id, "req.body key ");

    let joischema = joi.object({
      milestone: joi.string(),
      assigned_to: joi.string(),
      assigned_to_teams: joi.array(),
      due_date_key: joi.date(),
      type: joi.string().allow("percentage", "number", "currency"),
      value: joi.string(),
      target_value: joi.string(),
      linked_to: joi.string(),
      created_by_key: joi.string().allow("manager", "teamLead", "self"),
      created_by_id_key: joi.string(),
      created_for_key: joi.string().allow("team", "member", "self"),
    });

    let { error } = joischema.validate(req.body);

    if (error) {
      return next(new CustomErrorHandler(400, error.message));
    }

    const key_results = await KeyResult.create({
      milestone,
      assigned_to,
      assigned_to_teams,
      due_date_key,
      type,
      value,
      target_value,
      linked_to,
      created_by_key,
      created_by_id_key,
      created_for_key,
    });
    console.log(key_results, "key_results");
    if (!key_results) {
      return next(new CustomErrorHandler(400, "Goal not created"));
    }

    const goal = await Goal.findOneAndUpdate(
      { _id: id },
      { $push: { key_results: key_results._id } },
      { new: true }
    );
    console.log(goal, "goal sdsd", key_results);

    if (!goal) {
      return next(new CustomErrorHandler(400, "Goal not found"));
    }
    console.log(goal, "goal");
    return HelperResponse.success(
      res,
      "Key results added successfully",
      key_results
    );
  });

  static getGoals = catchAsync(async (req, res, next) => {
    const goals = await Goal.find({
      $and: [
        {
          "objective.linked_to": {
            $exists: false,
          },
        },
      ],
    });

    return HelperResponse.success(res, "Goals fetched successfully", goals);
  });
}

module.exports = GoalController;
