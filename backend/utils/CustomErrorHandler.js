class CustomErrorHandler extends Error {
  constructor(status, msg) {
    super();
    this.status = status;
    this.message = msg;
  }

  static Error(status, msg) {
    return res.status(status).json({
      success: false,
      message: msg,
    });
  }
}

module.exports = CustomErrorHandler;
