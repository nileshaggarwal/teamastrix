const { ValidationError } = require("joi");
const CustomErrorHandler = require("../utils/CustomErrorHandler");

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let data = {
    message: "internal server error !!!",
    // ...(DEBUG_MODE === 'true' && { originalError: err.message})
  };
  if (err instanceof ValidationError) {
    statusCode = 422 || 400;

    data = {
      success: false,
      message: err.message,
    };
  }

  if (err instanceof CustomErrorHandler) {
    statusCode = err.status;
    if (err.message.message) {
      data = {
        success: false,
        message: err.message.message,
      };
    } else {
      data = {
        success: false,
        message: err.message,
      };
    }
  }
  return res.status(statusCode).json(data);
};
module.exports = errorHandler;
