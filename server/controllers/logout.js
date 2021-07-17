const jwt = require("jsonwebtoken");
const { removeToken } = require("../redis/redis");

module.exports.logout = (req, res) => {
  const { authorization } = req.headers;
  if (authorization !== "null") {
    removeToken(authorization)
      .then((success) => {
        res.status(200).json({ msg: "Logged out" });
      })
      .catch((err) => {
        res.status(422).json({ msg: "Unble to remove" });
      });
  } else {
    res.status(400).json({ msg: "Didn't find user." });
  }
};
