import React, { useState } from "react";
import Layout from "./Layout";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState({
    email: "",
    buttonText: "Submit",
  });

  function handleChange(e) {
    setEmail({ ...email, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    document.getElementById("form").reset();
    setEmail({ buttonText: "Submitting" });
    const errorMessage = document.querySelector(".error");
    const successMessage = document.querySelector(".success");

    //reset error messages
    successMessage.textContent = "";
    errorMessage.textContent = "";

    axios
      .post(`${process.env.REACT_APP_API}/forgot-password`, email)
      .then((response) => {
        successMessage.textContent = response.data.msg;
        setEmail({ buttonText: "Submit" });
      })
      .catch((err) => {
        if (err.response.data.hasOwnProperty("error")) {
          errorMessage.textContent = err.response.data.error.email;
        } else {
          errorMessage.textContent = err.response.data.msg;
        }
        setEmail({ buttonText: "Submit" });
      });
  }

  const forgotPasswordForm = () => (
    <form onSubmit={handleSubmit} id="form">
      <div className="form-group">
        <label htmlFor="email" className="text-muted">
          Email
        </label>
        <input
          onChange={handleChange}
          name="email"
          type="text"
          className="form-control"
        />
      </div>

      <div className="pt-2">
        <button className="btn btn-primary">{email.buttonText}</button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <h1 className="p-5 text-center">Forgot Password</h1>
        <div className="success text-success"></div>
        <div className="error text-danger"></div>

        {forgotPasswordForm()}
      </div>
    </Layout>
  );
};

export default ForgotPassword;
