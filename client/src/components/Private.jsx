import axios from "axios";
import React, { useState, useEffect } from "react";
import Layout from "./Layout";

const Private = () => {
  const [blogs, setBlogs] = useState([]);
  const toke = window.sessionStorage.getItem("token");

  useEffect(() => {
    const message = document.querySelector(".msg");
    message.textContent = "";
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/blog`,
      headers: {
        Authorization: toke,
      },
    })
      .then((res) => {
        if (!res.data[0]) {
          message.textContent = "You do not have posts yet, write a post.";
        }
        setBlogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Layout>
      <div className="feed mt-5">
        {blogs.map((blog) => {
          return (
            <ul key={blog.id}>
              <li className="post-list-entry">
                <div className="post-list-entry-title">{blog.title}</div>
                <div className="post-list-entry-byline">{blog.author}</div>
                <div className="stats-list-item-views">
                  {" "}
                  Views: {blog.views}
                </div>
              </li>
            </ul>
          );
        })}
        <div className="msg text-center font-weight-bolder"></div>
      </div>
    </Layout>
  );
};

export default Private;
