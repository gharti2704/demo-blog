import React, { useState } from "react";
import Layout from "./Layout";
import axios from "axios";

const Signup = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    buttonText: "Submit",
  });

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    document.getElementById("form").reset();
    setUser({ buttonText: "Submitting" });
    const emailError = document.querySelector(".email");
    const passwordError = document.querySelector(".password");
    const activateMessage = document.querySelector(".activateMessage");

    //reset error messages
    emailError.textContent = "";
    passwordError.textContent = "";

    axios
      .post(`/api/signup`, user)
      .then((success) => {
        activateMessage.textContent = success.data.message;
        setUser({ buttonText: "Submit" });
      })
      .catch((err) => {
        emailError.textContent = err.response.data.error.email;
        passwordError.textContent = err.response.data.error.password;
        setUser({ buttonText: "Submit" });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
  }

  const signupForm = () => (
    <form onSubmit={handleSubmit} id="form">
      <div className="form-group">
        <div className="activateMessage text-success"></div>
        <label htmlFor="firstName" className="text-muted">
          First Name
        </label>
        <input
          onChange={handleChange}
          name="firstName"
          type="text"
          className="form-control"
          placeholder="Enter first name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName" className="text-muted">
          Last Name
        </label>
        <input
          onChange={handleChange}
          name="lastName"
          type="text"
          className="form-control"
          placeholder="Enter last name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email" className="text-muted">
          Email
        </label>
        <input
          onChange={handleChange}
          name="email"
          type="text"
          className="form-control"
          placeholder="Enter email"
        />
        <div className="email text-danger"></div>
      </div>

      <div className="form-group">
        <label htmlFor="password" className="text-muted">
          Password
        </label>
        <input
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control"
          placeholder="Enter password"
        />
        <div className="text-danger password"></div>
      </div>
      <div className="pt-2">
        <button className="btn btn-primary" id="button-addon1">
          {user.buttonText}
        </button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <h1 className="p-5text-center"> Signup</h1>
        {signupForm()}
      </div>
    </Layout>
  );
};

export default Signup;
