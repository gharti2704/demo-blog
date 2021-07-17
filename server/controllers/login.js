const { User } = require("../postgres/index");
const { setToken } = require("../redis/redis");
const { createToken } = require("./jwt");

module.exports.login = async function (req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.authenticate(email, password);
    const token = await createToken(user.id, user.firstName);
    setToken(token, user.id).then(() => {
      res.status(200).json({ token });
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
