const { User } = require("../postgres/index");
const { createActivationToken } = require("./jwt");
const sendGridMail = require("@sendgrid/mail");

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });

  if (user) {
    let error = { email: "Email already registered. Please login." };
    res.status(422).json({ error });
  } else {
    const token = createActivationToken(firstName, lastName, email, password);

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Account activation link`,
      html: `<p>Please click <a href=${process.env.CLIENT_URL}/activate/${token}>here</a> to activate your account.</p>
         
          <hr />
          <p>This email may contain sensetive information</p>
          <p>${process.env.CLIENT_URL}</p>`,
    };

    sendGridMail
      .send(emailData)
      .then((sent) => {
        return res.status(201).json({
          message: `Email has been sent to ${email}. Follow the instruction to activate your account.`,
        });
      })
      .catch((err) => {
        return res.status(401).json({
          message: err.message,
        });
      });
  }
};
