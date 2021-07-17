import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth } from "../helpers/auth";
const { logout } = require("../helpers/logout");

const Nav = ({ match, history }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    const user = isAuth();
    if (user) {
      setName(user.firstName);
    }
  }, []);

  const isActive = (path) => {
    if (match.path === path) {
      return { color: "#000" };
    } else {
      return { color: "#fff" };
    }
  };

  return (
    <ul className="nav nav-tab bg-primary">
      <Fragment>
        <li
          className="nav-item"
          onClick={() => {
            history.push("/");
          }}
        >
          <Link to="/" className="nav-link" style={isActive("/")}>
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/post" className="nav-link" style={isActive("/post")}>
            Write a Post
          </Link>
        </li>
      </Fragment>
      {!isAuth() && (
        <Fragment>
          <li className="nav-item">
            <Link
              to="/signup"
              className=" nav-link"
              style={isActive("/signup")}
            >
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className=" nav-link" style={isActive("/login")}>
              Login
            </Link>
          </li>
        </Fragment>
      )}
      {isAuth() && (
        <Fragment>
          <li className="nav-item">
            <Link
              to="/private"
              className=" nav-link"
              style={isActive("/private")}
            >
              {name}
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/update-profile"
              className=" nav-link"
              style={isActive("/update-profile")}
            >
              Edit Profile
            </Link>
          </li>

          <li className="nav-item">
            <span
              className=" nav-link"
              style={{ cursor: "pointer", color: "#fff" }}
              onClick={() => {
                logout(() => {
                  history.push("/");
                });
              }}
            >
              Logout
            </span>
          </li>
        </Fragment>
      )}
    </ul>
  );
};

export default withRouter(Nav);
