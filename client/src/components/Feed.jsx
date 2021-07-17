import React, { useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
const moment = require("moment");

const Feed = (props) => {
  const { feed } = props.location.state;

  useEffect(() => {
    axios.patch(`${process.env.REACT_APP_API}/visit/${feed.id}`);
  });

  return (
    <Layout>
      <div className="post">
        <h1 className="post-title">{feed.title}</h1>
        <div className="post-byline">
          <span className="post-byline-author">{feed.author}</span>{" "}
          {moment(feed.createdAt).fromNow()}
        </div>
        <img src={feed.image.imageUrl} className="post-image" alt="" />
        {feed.body.split("\n\n").map((paragraph, index) => (
          <p key={index}>
            {paragraph
              .split("\n")
              .reduce((total, line) => [total, <br key={feed._id} />, line])}
          </p>
        ))}
      </div>
    </Layout>
  );
};

export default Feed;
