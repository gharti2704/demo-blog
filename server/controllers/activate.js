const { verifyToken, createToken } = require("./jwt");
const { User } = require("../postgres/index");
const { setToken } = require("../redis/redis");

module.exports.activateAccount = async (req, res) => {
  const { token } = req.body;
  const result = await verifyToken(token, process.env.JWT_ACCOUNT_ACTIVATION);

  if (!result) {
    let error = { msg: "This link has been expired please signup again." };
    res.status(401).json({ error });
  } else {
    const { firstName, lastName, email, password } = result;

    try {
      const user = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });

      const newToken = await createToken(user.id, user.firstName);
      setToken(newToken, user.id).then((token) => {
        res.status(201).json(token);
      });
    } catch (err) {
      let error = { email: null };
      error.email = err.errors[0].message;
      res.status(400).json({ error });
    }
  }
};
