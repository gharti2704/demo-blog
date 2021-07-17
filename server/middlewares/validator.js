const { validationResult } = require("express-validator");

const handleErrors = (err) => {
  let errs = { email: null, password: null };
  err.errors.forEach((error) => {
    errs[error.param] = error.msg;
  });

  return errs;
};

module.exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = handleErrors(errors);
    return res.status(422).json({ error });
  }

  next();
};
