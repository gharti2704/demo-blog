const db = require("../postgres/db");
const { DataTypes } = require("sequelize");
const { User } = require("./User");
const { Blog } = require("./Blog");

module.exports.Image = db.define("image", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  blogId: {
    type: DataTypes.INTEGER,
    references: {
      model: Blog,
      key: "id",
    },
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
