import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";
import { Link } from "react-router-dom";

const UpdateProfile = ({ history }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    buttonText: "Update",
  });

  const token = window.sessionStorage.getItem("token");

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/user`,
      headers: {
        Authorization: token,
      },
    })
      .then((user) => {
        const { firstName, lastName, email } = user.data;
        setUser({ ...user, firstName, lastName, email, buttonText: "Update" });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSubmit(e) {
    e.preventDefault();
    document.getElementById("form").reset();
    setUser({ buttonText: "Updating" });
    const passwordError = document.querySelector(".password");
    const activateMessage = document.querySelector(".activateMessage");

    //reset error messages
    passwordError.textContent = "";

    axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_API}/update-profile`,
      data: user,
      headers: {
        Authorization: token,
      },
    })
      .then((success) => {
        activateMessage.textContent = success.data.msg;
      })
      .then(() => {
        setUser({ buttonText: "Update" });
        setTimeout(() => {
          history.push("/");
        }, 3000);
      })
      .catch((err) => {
        passwordError.textContent = err.response.data.msg;
        setUser({ buttonText: "Update" });
      });
  }

  const { firstName, lastName, email, buttonText } = user;

  const signupForm = () => (
    <form onSubmit={handleSubmit} id="form">
      <div className="form-group">
        <div className="activateMessage text-success"></div>
        <label htmlFor="firstName" className="text-muted">
          First Name
        </label>
        <input
          defaultValue={firstName}
          onChange={handleChange}
          name="firstName"
          type="text"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName" className="text-muted">
          Last Name
        </label>
        <input
          defaultValue={lastName}
          onChange={handleChange}
          name="lastName"
          type="text"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email" className="text-muted">
          Email
        </label>
        <input
          defaultValue={email}
          name="email"
          type="text"
          className="form-control"
          disabled
        />
      </div>

      <div className="pt-2">
        <button className="btn btn-primary" type="submit">
          {buttonText}
        </button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <h1 className="pt-5 text-center"> Profile</h1>
        <p className="lead text-center"> Edit Profile</p>
        {signupForm()}
        <Link to="password" className="btn btn-md text-info pt-2">
          Change my password
        </Link>
      </div>
    </Layout>
  );
};

export default UpdateProfile;
