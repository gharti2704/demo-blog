import React, { useState } from "react";
import axios from "axios";
import Layout from "./Layout";

const Post = ({ history }) => {
  const token = window.sessionStorage.getItem("token");
  const [file, setFile] = useState();
  const [post, setPost] = useState({
    title: "",
    author: "",
    body: "",
  });

  const postImage = (blogId) => {
    const formData = new FormData();
    formData.append("file", file);
    const errorMessage = document.getElementsByClassName(".error");
    errorMessage.textContent = "";

    axios
      .post(`/api/upload/${blogId}`, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => {
        history.push("/");
      })
      .catch((err) => {
        errorMessage.textContent = "Unable to upload image.";
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
  };

  const handleImageUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMessage = document.getElementsByClassName(".error");
    errorMessage.textContent = "";

    axios({
      method: "POST",
      url: `/api/blog`,
      data: post,
      headers: {
        Authorization: token,
      },
    })
      .then((success) => {
        const blogId = success.data.blogId;
        postImage(blogId);
      })
      .catch((err) => {
        errorMessage.textContent = "Unable to post at this time.";
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
  };

  const createPostForm = () => (
    <form onSubmit={handleSubmit} id="form">
      <div className="form-group">
        <label forhtml="title">Title</label>
        <input
          onChange={handleChange}
          name="title"
          className="create-input form-control"
          type="text"
          placeholder="Post Title"
        ></input>
      </div>

      <div className="form-group">
        <label forhtml="author">Author</label>
        <input
          onChange={handleChange}
          name="author"
          className="create-input form-control"
          type="text"
          placeholder="Author"
        ></input>
      </div>

      <label forhtml="image">Image</label>
      <div className="input-group mb-3">
        <input
          type="file"
          className="form-control"
          onChange={handleImageUpload}
          name="file"
        />
      </div>

      <div className="form-group">
        <textarea
          onChange={handleChange}
          name="body"
          className="create-body-textarea form-control"
          placeholder="Post Body"
        ></textarea>
      </div>
      <button className="create-submit-button" type="submit">
        Save post
      </button>
    </form>
  );

  return (
    <Layout>
      <div className="create">
        <div className="create-editor col-md-6 offset-md-3">
          <h2>WRITE YOUR POST</h2>
          <div className="error"></div>
          {createPostForm()}
        </div>
      </div>
    </Layout>
  );
};

export default Post;
