const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const CustomErrorHandler = require("../utils/CustomErrorHandler");

const isManager = (req, res, next) => {
  try {
    let authHeader = req.headers.authorization;
    let token = authHeader.split(" ")[1];
    let decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role === "manager") {
      next();
    } else {
      return next(new CustomErrorHandler(403, "You are not allowed to access this route"));
    }
  } catch (error) {
    return next(new CustomErrorHandler(403, "You are not allowed to access this route"));
  }
};

module.exports = isManager;
