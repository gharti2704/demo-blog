const { getToken } = require("../redis/redis");

module.exports.requireAuth = (req, res, next) => {
  const { authorization } = req.headers;

  getToken(authorization)
    .then((id) => {
      req.id = id;
      next();
    })
    .catch((err) => {
      res
        .status(400)
        .json({ msg: "something went wrong, please login again." });
    });
};

module.exports.checkHeaders = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    getToken(authorization)
      .then((id) => {
        res.status(200).json({ id: id });
      })
      .catch((err) => {
        res.status(401).json({ msg: "Please login first" });
      });
  } else {
    next();
  }
};
