const { Sequelize, DataTypes } = require("sequelize");
const userModel = require("../models/user");
const postModel = require("../models/post");
const commentModel = require("../models/comment");
const config=require('../config/config.json');
require("dotenv").config();

const dataBase = new Sequelize(
  `${config.development.database}`,
  `${config.development.username}`,
  `${config.development.password}`,
  {
    host: `${config.development.host}`,
    dialect: `${config.development.dialect}`,
    dialectOptions: {
      // timezone: "Etc/GMT-2",
    },
    login: false,
  }
);

try {
  dataBase.authenticate();
  console.log("Connection établie, ISS enterprise prêt au combat");
} catch (error) {
  console.error("Les klingons sa piques:", error);
}

const post = postModel(dataBase, DataTypes);
const user = userModel(dataBase, DataTypes);
const comment = commentModel(dataBase, DataTypes);

const initDb = () => {
  return dataBase.sync({ force: true }).then(() => {
    user
      .create({
        email: "admin@gmail.com",
        pseudo: "admin",
        password: 'Openclassroom',
        isAdmin: true,
      })
      .then((user) => console.log(user.toJSON()));
    console.log("la base de données est initialisée.");
  });
};

module.exports = { initDb, user, post, comment };