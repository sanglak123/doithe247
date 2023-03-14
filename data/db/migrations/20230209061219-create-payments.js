'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
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
      idbankOfUser: {
        type: Sequelize.INTEGER,
        references: {
          model: "BankOfUsers",
          key: "id"
        }
      },
      idReceiveBank: {
        type: Sequelize.INTEGER,
        references: {
          model: "ReceiveBanks",
          key: "id"
        }
      },
      amount: {
        type: Sequelize.STRING
      },
      img: {
        type: Sequelize.INTEGER,
        references: {
          model: "Imgs",
          key: "id"
        }
      },
      command: {
        type: Sequelize.STRING
      },
      sign: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      message: {
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
    await queryInterface.dropTable('Payments');
  }
};