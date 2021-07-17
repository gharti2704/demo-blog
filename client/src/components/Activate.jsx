import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";
const jwt = require("jsonwebtoken");

const Activate = ({ match, history }) => {
  const [user, setUser] = useState({
    firstName: "",
    token: "",
    show: true,
  });

  function logUserIn(token) {
    window.sessionStorage.setItem("token", token);

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/login`,
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
    if (token) {
      setUser({ ...user, firstName, token });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { firstName, token } = user;

  const handleSubmit = (event) => {
    event.preventDefault();
    const activateMessage = document.querySelector(".activate");
    activateMessage.textContent = "";

    axios
      .post(`${process.env.REACT_APP_API}/activate`, { token })
      .then((response) => {
        logUserIn(response.data);
      })
      .catch((error) => {
        activateMessage.textContent = "Invalid link, please login or signup.";
      });
  };

  const activationLink = () => (
    <div className="text-center">
      <h1 className="p-5">Hey {firstName}, Ready to activate your account?</h1>
      <div className="activate text-danger p-3"></div>
      <button className="btn btn-outline-primary" onClick={handleSubmit}>
        Activate Account
      </button>
    </div>
  );

  return <Layout>{activationLink()}</Layout>;
};

export default Activate;
