'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idUser: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        }
      },
      command: {
        type: Sequelize.STRING
      },
      idPrice: {
        type: Sequelize.INTEGER,
        references: {
          model: "Prices",
          key: "id"
        }
      },
      feesChange: {
        type: Sequelize.STRING
      },
      feesBuy: {
        type: Sequelize.STRING
      },
      receiveValue: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      serial: {
        type: Sequelize.STRING
      },
      sign: {
        type: Sequelize.STRING
      },
      request_id: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      count: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Products');
  }
};