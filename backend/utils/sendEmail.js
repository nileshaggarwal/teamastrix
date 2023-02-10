const sgMail = require("@sendgrid/mail");
const { SENDGRID_KEY } = require("../config");

function sendEmail(email, subject, message, attachments) {
  sgMail.setApiKey(SENDGRID_KEY);
  const msg = {
    to: email, // Change to your recipient
    from: "astrixteam8@gmail.com", // Change to your verified sender
    subject: subject,
    html: message,
    attachments: attachments,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error("->", error);
    });
  return;
}
module.exports = sendEmail;
