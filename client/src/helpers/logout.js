const axios = require("axios");

module.exports.logout = (next) => {
  const token = window.sessionStorage.getItem("token");

  axios({
    method: "GET",
    url: `${process.env.REACT_APP_API}/logout`,
    headers: {
      Authorization: token,
    },
  })
    .then((success) => {
      window.sessionStorage.removeItem("token");
    })
    .then(() => {
      next();
    })
    .catch((err) => {
      alert(err.response.data.msg);
    });
};
