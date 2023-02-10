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

class GoalController {
  static addObjective = catchAsync(async (req, res, next) => {
    const {
      name,
      assigned_team,
      equal_percentage,
      created_by,
      linked_to,
      target_type,
      target_value,
      due_date,
    } = req.body;

    let joischema = joi.object({
      name: joi.string().min(3).max(30).required(),
      assigned_team: joi.string().required(),
      equal_percentage: joi.boolean().required(),
      created_by: joi.string().allow("manager", "teamLead").required(),
      linked_to: joi.string(),
      target_value: joi.string().required(),
      target_type: joi.string().allow("percentage", "number", "currency").required(),
      due_date: joi.date().required(),
    });

    let { error } = joischema.validate(req.body);

    if (error) {
      return next(new CustomErrorHandler(400, error.message));
    }

    let isTeamExist = await Team.findById(assigned_team);

    if (!isTeamExist || isTeamExist.is_active === false) {
      return next(new CustomErrorHandler(400, "Team not found"));
    }

    const goal = await Goal.create({
      objective: {
        name,
        assigned_team,
        equal_percentage,
        created_by,
        linked_to,
        target_type,
        target_value,
        due_date,
      },
    });

    return HelperResponse.success(res, "Objective created successfully", goal.objective);
  });

  static addKeyResult = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { key_results } = req.body;

    let joischema = joi.object({
      key_results: joi
        .array()
        .items(
          joi.object({
            milestone: joi.string().required(),
            assigned_to: joi.string(),
            assigned_team: joi.string(),
            due_date: joi.date().required(),
            type: joi.string().allow("percentage", "number", "currency").required(),
            value: joi.string(),
            target_value: joi.string().required(),
          })
        )
        .required(),
    });

    let { error } = joischema.validate(req.body);

    if (error) {
      return next(new CustomErrorHandler(400, error.message));
    }

    const goal = await Goal.findById(id);

    if (!goal) {
      return next(new CustomErrorHandler(400, "Goal not found"));
    }

    goal.key_results = key_results;

    await goal.save();

    return HelperResponse.success(res, "Key results added successfully", goal.key_results);
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
