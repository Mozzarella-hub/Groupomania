const { Sequelize, DataTypes } = require("sequelize");
const userModel = require("../models/user");
const postModel = require("../models/post");
const commentModel = require("../models/comment");
require("dotenv").config();

const dataBase = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USER}`,
  `${process.env.DB_PASSWORD}`,

  {
    host: `${process.env.DB_HOST}`,
    port:3306,          //`${process.env.PORT}`,
    dialect: "mysql",
    dialectOptions: {
      timezone: "local",
      //socketPath: "C:\\MAMP\bin\mysql\bin"
    },
    login: false,
  }
  
);

try {
  dataBase.authenticate();
  console.log('Connection établie, ISS enterprise prêt au combat');
} catch (error) {
  console.error('Les klingons sa piques:', error);
}

const post = postModel(dataBase, DataTypes);
const user = userModel(dataBase, DataTypes);
const comment = commentModel(dataBase, DataTypes);

const initDb = () => {
  return dataBase.sync({ force: true }).then(() => {
    
      user.create({
        email: "admin@gmail.com",
        pseudo: "admin",
        password: openclassroom,
        isAdmin: true,
      }).then((user) => console.log(user.toJSON()));
    ;
    console.log("la base de données est initialisée.");
  });
};

module.exports = { initDb, user, post, comment, dataBase };
