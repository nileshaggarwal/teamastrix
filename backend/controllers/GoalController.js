const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Team = require("../models/Team");
const { Goal, KeyResult } = require("../models/Goals");
const joi = require("joi");
const CustomErrorHandler = require("../utils/CustomErrorHandler");
const HelperResponse = require("../utils/HelperResponse");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN, CHANGE_PASSWORD_URL } = require("../config");
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
      target_value: joi.number(),
      target_type: joi.string().allow("percentage", "number", "currency").required(),
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
      value: joi.number(),
      target_value: joi.number().required(),
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
    return HelperResponse.success(res, "Key results added successfully", key_results);
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

  static updateProgress = catchAsync(async (req, res, next) => {
    let key = await KeyResult.findById(req.params.id);
    if (!key) {
      return next(new CustomErrorHandler(400, "Key not found"));
    }
    key.value = req.body.value;
    await key.save();
    if (key.linked_to !== null) {
      let keygoal = await KeyResult.findById(key.linked_to);
      let keys = await KeyResult.find({ linked_to: key.linked_to });
      let total = 0;

      keys.forEach((key) => {
        total = total + parseInt(key.value);
      });
      if (key.type === "percentage") {
        keygoal.value = total / keys.length;
      } else {
        keygoal.value = total;
      }
      await keygoal.save();
      let goal = await Goal.find({
        $elemMatch: {
          key_results: keygoal._id,
        },
      });
      goal = await KeyResult.populate(goal, { path: "key_results" });
      let total2 = 0;
      goal[0].key_results.forEach((key) => {
        total2 = total2 + parseInt(key.value);
      });
      if (goal[0].objective.target_type === "percentage") {
        goal[0].objective.value = total2 / goal[0].key_results.length;
      } else {
        goal[0].objective.value = total2;
      }
      await goal[0].save();
    }
  });

  static getOkrsByUserId = catchAsync(async (req, res, next) => {
    const { id } = req.user;

    const keyresults = await KeyResult.find({ assigned_to: id })
      .populate("assigned_to", "name designation")
      .populate("assigned_to_teams", "name")
      .lean();

    return HelperResponse.success(res, "Key results fetched successfully", keyresults);
  });

  static getOkrbyTeam = catchAsync(async (req, res, next) => {
    const { id } = req.user;
    req.params;

    const keyresults = await KeyResult.find({ assigned_to_teams: id })
      .populate("assigned_to", "name designation")
      .populate("assigned_to_teams", "name")
      .lean();

    return HelperResponse.success(res, "Key results fetched successfully", keyresults);
  });
}

module.exports = GoalController;
