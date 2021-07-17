import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";
import jwt from "jsonwebtoken";

const ResetPassword = ({ match, history }) => {
  const [values, setValues] = useState({
    firstName: "",
    token: "",
  });

  const [password, setPassword] = useState({
    password: "",
    buttonText: "Reset",
  });

  function logUserIn(token) {
    window.sessionStorage.setItem("token", token);

    axios({
      method: "POST",
      url: `/api/login`,
      headers: {
        Authorization: token,
      },
    })
      .then(() => {
        history.push("/");
        window.location.reload();
      })

      .catch((err) => {
        window.sessionStorage.removeItem("token");
        history.push("/login");
      });
  }

  useEffect(() => {
    const token = match.params.token;
    const { firstName } = jwt.decode(token);
    setValues({ ...values, firstName, token });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleChange(e) {
    setPassword({ ...password, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    document.getElementById("form").reset();
    setPassword({ buttonText: "Resetting" });
    const errorMessage = document.querySelector(".error");
    const successMessage = document.querySelector(".success");

    //reset error messages
    successMessage.textContent = "";
    errorMessage.textContent = "";

    axios({
      method: "PATCH",
      url: `/api/reset-password`,
      data: password,
      headers: {
        Authorization: values.token,
      },
    })
      .then((response) => {
        logUserIn(response.data);
        setPassword({ buttonText: "Reset" });
      })
      .catch((err) => {
        if (err.response.data.hasOwnProperty("error")) {
          errorMessage.textContent = err.response.data.error.password;
        } else {
          errorMessage.textContent = err.response.data.msg;
        }
        setPassword({ buttonText: "Reset" });
      });
  }

  const resetPasswordForm = () => (
    <form onSubmit={handleSubmit} id="form">
      <div className="form-group">
        <label htmlFor="password" className="text-muted">
          New Password
        </label>
        <input
          onChange={handleChange}
          name="password"
          type="text"
          className="form-control"
          placeholder="Enter new password"
        />
      </div>

      <div className="pt-2">
        <button className="btn btn-primary">{password.buttonText}</button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <h3 className="p-5 tex-center">
          Hey {values.firstName}, please reset your password.
        </h3>
        <div className="success text-success"></div>
        <div className="error text-danger"></div>

        {resetPasswordForm()}
      </div>
    </Layout>
  );
};

export default ResetPassword;
