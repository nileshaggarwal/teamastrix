const dotenv = require("dotenv");

dotenv.config();

const { PORT, DB_URL, JWT_SECRET, JWT_EXPIRES_IN, SENDGRID_KEY, CHANGE_PASSWORD_URL } = process.env;

module.exports = {
  PORT,
  DB_URL,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  SENDGRID_KEY,
  CHANGE_PASSWORD_URL,
};
