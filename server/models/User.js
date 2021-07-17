const db = require("../postgres/db");
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const hashPassword = (password) => bcrypt.hash(password, 12);

const User = db.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: "This email is already registered, please login..",
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.beforeCreate(async function (user) {
  const hashedPassword = await hashPassword(user.password.toString());
  user.password = hashedPassword;
});

User.authenticate = async function (email, password) {
  const user = await this.findOne({ where: { email: email } });
  if (user) {
    const auth = await bcrypt.compare(password.toString(), user.password);
    if (auth) {
      return user;
    }
  }

  throw new Error("incorrect email or password.");
};

module.exports = {
  User,
  hashPassword,
};
