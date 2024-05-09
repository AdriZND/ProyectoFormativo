const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "justyn.jones@ethereal.email",
    pass: "1vmHwEewdf989zwSKN",
  },
});

//Funcion para enviar el mensaje con nodemailer al usuario que acaba de registrarse
async function sendMessageValidation(userEmail, userURL) {
  userURL = "http://127.0.0.1:5173/confirmation/" + userURL;
  const info = await transporter.sendMail({
    from: '"User registration" <justyn.jones@ethereal.email>',
    to: userEmail,
    subject: "Validation e-mail",
    text: "You must validate your user",
    html:
      '<div>Click <a href="' +
      userURL +
      '">here</a> to confirm your email</div>',
  });

  console.log("Message sent: %s", info.messageId);
}

async function sendMessageForgetPassword(userEmail, userURL) {
  userURL = "http://127.0.0.1:5173/forgetpassword/changepassword/" + userURL;
  const info = await transporter.sendMail({
    from: '"User registration" <justyn.jones@ethereal.email>',
    to: userEmail,
    subject: "Change your password",
    text: "Here's how you can change your password",
    html:
      '<div>Click <a href="' +
      userURL +
      '">here</a> to change your password</div>',
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = {
  sendMessageValidation,
  sendMessageForgetPassword,
};
