/*
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  
  class user extends Model {
    static associate(models) {
      // define association here
      models.user.hasMany(models.comment),
      models.user.hasMany(models.post)
    }
  }
  user.init({
    email: DataTypes.STRING,//placer validation une seule email
    pseudo: DataTypes.STRING,
    password: DataTypes.STRING,
    bio: DataTypes.STRING,
    followers: DataTypes.STRING,
    following: DataTypes.STRING,
    likes: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
*/
//password": "$2a$10$EMnYDhfq1x7OlBLRFai8vOVKLzY.k1lXF4TNNL0hE6NVEmou4epJu",


module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Cet adresse mail est déjà utilisée.",
      },
      validate: {
        isEmail: { msg: "Veuillez entrer une adresse mail au bon format." },
      },
    },
    pseudo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Ce pseudo est déjà utilisé.",
      },
      validate: {
        len: {
          args: [4, 16],
          msg: "Votre pseudo doit comporter entre 4 et 16 caractères.",
        },
        is: {
          args: /^[\wéè^éàôïù]+$/g,
          msg: "Les caractères spéciaux et les espaces ne sont pas autorisés dans le pseudo.",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};