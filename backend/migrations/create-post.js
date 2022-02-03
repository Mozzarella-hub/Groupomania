'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user: {
        allowNull: false,
        type: Sequelize.INTEGER,
        /*references: {
          model:'user',
          key:'id'
        }*/
      },
      isAdmin: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      like: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      text: {
        type: Datatypes.TEXT,
        allowNull: false
      },
      pictureUrl: {
        allowNull: true,
        type: Sequelize.STRING
      },
      videoUrl: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  }
};