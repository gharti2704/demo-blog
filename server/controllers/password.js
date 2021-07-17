const { User, hashPassword } = require("../models/User");
const { createToken, verifyToken } = require("./jwt");
const { setToken } = require("../redis/redis");
const sendGridMail = require("@sendgrid/mail");

module.exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  User.findOne({
    where: {
      email: email,
    },
  })
    .then(async (user) => {
      const token = await createToken(user.email, user.firstName);
      const emailData = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: `Password reset link`,
        html: `<p>Please click <a href=${process.env.CLIENT_URL}/password/reset/${token}>here</a> to reset your password.</p>
           
            <hr />
            <p>This email may contain sensetive information</p>
            <p>${process.env.CLIENT_URL}</p>`,
      };

      sendGridMail.send(emailData).then((sent) => {
        return res.status(201).json({
          msg: `Email has been sent to ${email}. Follow the instruction to reset your password.`,
        });
      });
    })
    .catch((err) => {
      res.status(400).json({ msg: "Email doesn't exist, please signup." });
    });
};

module.exports.resetPassword = async (req, res) => {
  const { authorization } = req.headers;
  const { option } = verifyToken(authorization, process.env.JWT_SECRET);
  const email = option;
  if (email) {
    const { password } = req.body;
    const hashedPassword = await hashPassword(password.toString());

    User.findOne({
      where: {
        email: email,
      },
    })
      .then((user) => {
        user.password = hashedPassword;
        user.save();
        return user;
      })
      .then(async (user) => {
        const token = await createToken(user.id, user.firstName);
        setToken(token, user.id);
        res.status(201).json(token);
      })
      .catch((err) => {
        res.status(400).json({ msg: "Unable reset password at this time." });
      });
  } else {
    res.status(400).json({ msg: "Invalid link." });
  }
};
