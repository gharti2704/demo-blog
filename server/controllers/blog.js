const { Blog, Image } = require("../postgres/index");

module.exports.postBlog = async (req, res) => {
  const { title, author, body } = req.body;
  const userId = req.id;
  try {
    const blog = await Blog.create({
      userId: userId,
      title: title,
      author: author,
      body: body,
    });
    res.status(200).json({ blogId: blog.id });
  } catch (err) {
    res.status(400).json({ msg: "We couldn't write your post at this time" });
  }
};

module.exports.getBlog = (req, res) => {
  const id = req.id;

  Blog.findAll({
    where: {
      userId: id,
    },
  })
    .then((blogs) => {
      res.status(200).json(blogs);
    })
    .catch((err) => {
      res.status(500).json({ msg: "Unble to get posts." });
    });
};

module.exports.getAllBlogs = (req, res) => {
  Blog.findAll({
    order: [["createdAt", "DESC"]],
    include: {
      model: Image,
      // as: 'imageUrl',
      attributes: ["imageUrl"],
    },
  })
    .then((blogs) => {
      res.status(200).json(blogs);
    })
    .catch((err) => {
      res.status(400).json({ msg: "No blog available." });
    });
};
