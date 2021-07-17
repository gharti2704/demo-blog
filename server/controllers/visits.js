const { Blog } = require("../models/Blog");

module.exports.incrementVisits = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findOne({
      where: {
        id: id,
      },
    });

    await blog.increment("views", { by: 1 });
    res.status(204);
  } catch (err) {
    res.status(500);
  }
};
