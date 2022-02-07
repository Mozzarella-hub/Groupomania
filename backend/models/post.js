
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Post", {
    userId: {
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

    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
