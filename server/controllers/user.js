const { User } = require("../postgres/index");

module.exports.getUser = (req, res) => {
  const id = req.id;
  User.findOne({
    where: {
      id: id,
    },
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
