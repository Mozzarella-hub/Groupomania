
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Comment", {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    commenterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};


