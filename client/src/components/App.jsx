import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import moment from "moment";
import { Redirect } from "react-router-dom";
import axios from "axios";

const App = () => {
  const [feed, setFeed] = useState({});
  const [show, setShow] = useState(false);
  const [blogs, setBlogs] = useState([]);

  function handleClick(feed) {
    setFeed(feed);
    setShow(true);
  }

  useEffect(() => {
    const errorMessage = document.querySelector(".msg");
    errorMessage.textContent = "";
    axios
      .get(`/api/all-blogs`)
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        errorMessage.textContent = "Sorry we are unble to load the posts.";
      });
  }, []);

  return (
    <Layout>
      <div className="feed">
        {show === true ? (
          <Redirect to={{ pathname: "feed", state: { feed: feed } }} />
        ) : (
          blogs.map((blog) => {
            return (
              <ul key={blog.id}>
                <li
                  className="feed-list-item"
                  onClick={() => {
                    handleClick(blog);
                  }}
                >
                  <div className="feed-list-item-title">{blog.title}</div>
                  <div className="feed-list-item-byline">
                    <span className="feed-list-item-byline-author">
                      {blog.author}
                    </span>{" "}
                    {moment(blog.createdAt).fromNow()}
                  </div>
                  <img
                    src={blog.image.imageUrl}
                    onClick={() => {
                      handleClick(blog);
                    }}
                    alt=""
                    className="feed-list-item-image"
                  />
                  <span className="feed-list-item-lede">
                    {blog.body.slice(0, 100)}...
                  </span>
                </li>
              </ul>
            );
          })
        )}
        <div className="msg"></div>
      </div>
    </Layout>
  );
};

export default App;
