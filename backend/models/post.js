/*'use strict';
const { Model } = require('sequelize');
//const { FOREIGNKEYS } = require('sequelize/dist/lib/query-types');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
   
    static associate(models) {
      
      // define association here
        models.post.belongTo(models.user), {
          foreignKey: {
            allowNull: false
          }
        }

    }
  }
  post.init({
    id_user: DataTypes.INTEGER,
    isAdmin: DataTypes.BOOLEAN,
    like: DataTypes.INTEGER,
    picture: DataTypes.STRING,
    video: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};
*/

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
      allowNull: false,
    },
    video: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    posterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};