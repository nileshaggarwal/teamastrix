const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const joi = require("joi");
const CustomErrorHandler = require("../utils/CustomErrorHandler");
const HelperResponse = require("../utils/HelperResponse");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN, CHANGE_PASSWORD_URL } = require("../config");
const sendEmail = require("../utils/sendEmail");

class UserController {
  static register = catchAsync(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    let hashedPassword = await bcrypt.hash(password, 10);

    let joischema = joi.object({
      name: joi.string().min(3).max(30).required(),
      email: joi.string().email().required(),
      password: joi.string().min(6).max(30).required(),
      role: joi.string().valid("manager", "employee").required(),
    });

    let { error } = joischema.validate(req.body);

    if (error) {
      return next(new CustomErrorHandler(400, error.message));
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return HelperResponse.success(res, "User created successfully", user);
  });

  static login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return next(new CustomErrorHandler(400, "Invalid credentials"));
    }

    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new CustomErrorHandler(400, "Invalid credentials"));
    }

    let token = await jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return HelperResponse.success(res, "User logged in successfully", {
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  });

  static addEmployee = catchAsync(async (req, res, next) => {
    const { name, email, department } = req.body;

    let joischema = joi.object({
      name: joi.string().min(3).max(30).required(),
      email: joi.string().email().required(),
      department: joi.string().required(),
    });

    let { error } = joischema.validate(req.body);

    if (error) {
      return next(new CustomErrorHandler(400, error.message));
    }

    let isExist = await User.findOne({ email });

    if (isExist) {
      return next(new CustomErrorHandler(400, "Email already exist"));
    }

    let defaultPassword = "123456";

    let hashedPassword = await bcrypt.hash(defaultPassword, 10);

    let user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "employee",
      department,
    });

    await sendEmail(
      user.email,
      `Welcome to the ${user.department} department}`,
      `
    Click on the link to change your password <a href="${CHANGE_PASSWORD_URL}/${user._id}">Change Password</a> and login
    `
    );

    return HelperResponse.success(res, "Employee added successfully", user);
  });

  static ResetPassword = catchAsync(async (req, res, next) => {
    const { password } = req.body;

    const { id } = req.params;

    let user = await User.findById(id);

    if (!user) {
      return next(new CustomErrorHandler(400, "Invalid user"));
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    await user.save();

    return HelperResponse.success(res, "Password changed successfully", user);
  });

  static getEmployeesByDepartment = catchAsync(async (req, res, next) => {
    let { department } = req.params;

    let employees = await User.find({
      $and: [{ department: department }, { role: "employee" }],
    });

    return HelperResponse.success(res, "Employees fetched successfully", employees);
  });
}

module.exports = UserController;
