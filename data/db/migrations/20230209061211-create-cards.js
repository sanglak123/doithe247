'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idTypeCard: {
        type: Sequelize.INTEGER,
        references: {
          model: "TypeCards",
          key: "id"
        }
      },
      telco: {
        type: Sequelize.STRING
      },
      img: {
        type: Sequelize.INTEGER,
        references: {
          model: "Imgs",
          key: "id"
        }
      },
      change: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
    await queryInterface.dropTable('Cards');
  }
};