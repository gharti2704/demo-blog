module.exports.handleErrors = (err) => {
  let errs = { email: null, password: null };
  err.errors.forEach((error) => {
    errs[error.param] = error.msg;
  });

  return errs;
};
