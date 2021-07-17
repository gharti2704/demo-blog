const jwt = require("jsonwebtoken");

module.exports.isAuth = () => {
  const token = window.sessionStorage.getItem("token");
  const user = jwt.decode(token);
  return user;
};
