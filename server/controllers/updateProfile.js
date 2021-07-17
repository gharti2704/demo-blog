const { User } = require("../postgres/index");
const jwt = require("jsonwebtoken");

module.exports.updateProfile = async (req, res) => {
  const { authorization } = req.headers;
  const { option } = jwt.decode(authorization);
  const { firstName, lastName } = req.body;

  User.findByPk(option)
    .then((user) => {
      user.firstName = firstName;
      user.lastName = lastName;
      user.save();
    })
    .then((user) => {
      res.status(201).json({ ...user, msg: "Profile update successful. It will take effect in your next login." });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ msg: "We are unable to update your profile at this time." });
    });
};
