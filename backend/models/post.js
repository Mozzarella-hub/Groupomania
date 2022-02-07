
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Post", {
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
    
    },
    video: {
      type: DataTypes.STRING,
      
    },

    posterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};


/*
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    
    static associate(models) {
      models.Post.hasMany(models.Comment, { onDelete: "CASCADE", hooks: true });

      models.Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
      });
    }
  }
  Post.init(
    {
      userId: DataTypes.INTEGER,
      imageUrl: DataTypes.STRING,
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};

*/