import React, { Fragment } from "react";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Nav />
      <div className="container">{children}</div>
    </Fragment>
  );
};

export default Layout;
