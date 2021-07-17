import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import Layout from "./Layout";
import axios from "axios";
import { isAuth } from "../helpers/auth";

const Login = ({ history }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    buttonText: "Submit",
  });

  function saveAuthTokenSession(token) {
    window.sessionStorage.setItem("token", token);
  }

  useEffect(() => {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_API}/login`,
        headers: {
          Authorization: token,
        },
      })
        .then((data) => {})
        .catch((err) => {
          window.sessionStorage.removeItem("token");
          history.push("/login");
        });
    }
  });

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    document.getElementById("form").reset();
    setUser({ buttonText: "Submitting" });
    const errorMessage = document.querySelector(".error");

    //reset error messages
    errorMessage.textContent = "";

    axios
      .post(`${process.env.REACT_APP_API}/login`, user)
      .then((response) => {
        saveAuthTokenSession(response.data.token);
        setUser({ buttonText: "Submit" });
      })
      .catch((err) => {
        errorMessage.textContent = err.response.data.msg;
        setUser({ buttonText: "Submit" });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
  }

  const loginForm = () => (
    <form onSubmit={handleSubmit} id="form">
      <div className="form-group">
        <label htmlFor="email" className="text-muted">
          <div className="error text-danger"></div>
          Email
        </label>
        <input
          onChange={handleChange}
          name="email"
          type="text"
          className="form-control"
          placeholder="Enter email"
        />
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
      </div>
      <div className="pt-2">
        <button className="btn btn-primary center">{user.buttonText}</button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        {isAuth() ? <Redirect to="private" /> : null}
        <h1 className="p-5 text-center"> Login</h1>
        {loginForm()}
        <Link to="password" className="btn btn-md text-info pt-2">
          Forgot your password?
        </Link>
      </div>
    </Layout>
  );
};

export default Login;
