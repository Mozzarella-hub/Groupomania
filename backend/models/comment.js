
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Comment", {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    commenterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};


