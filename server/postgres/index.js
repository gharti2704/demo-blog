const { User } = require("../models/User");
const { Blog } = require("../models/Blog");
const { Image } = require("../models/Image");

// User.sync({ force: true });
// Blog.sync({ force: true });
// Image.sync({ force: true });

User.hasMany(Blog, { foreignKey: "userId" });
Blog.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Image, { foreignKey: "userId" });
Image.belongsTo(User, { foreignKey: "userId" });

Blog.hasOne(Image, { foreignKey: "blogId" });
Image.belongsTo(Blog, { foreignKey: "blogId" });

module.exports = {
  User,
  Blog,
  Image,
};
