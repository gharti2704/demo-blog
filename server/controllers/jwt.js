const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

module.exports.createToken = (option, firstName) => {
  return jwt.sign({ option, firstName }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.createActivationToken = (
  firstName,
  lastName,
  email,
  password
) => {
  return jwt.sign(
    {
      firstName,
      lastName,
      email,
      password,
    },
    process.env.JWT_ACCOUNT_ACTIVATION,
    {
      expiresIn: 24 * 60 * 60,
    }
  );
};

module.exports.verifyToken = (token, secret) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    return err;
  }
};
