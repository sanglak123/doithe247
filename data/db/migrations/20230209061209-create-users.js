'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userName: {
        type: Sequelize.STRING
      },
      displayName: {
        type: Sequelize.STRING
      },
      fullName: {
        type: Sequelize.STRING
      },
      adress: {
        type: Sequelize.STRING
      },
      pass: {
        type: Sequelize.STRING
      },
      pass2: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.INTEGER,
        references: {
          model: "Imgs",
          key: "id"
        }
      },
      surplus: {
        type: Sequelize.STRING,
        defaultValue: "0"
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      wallet_number: {
        type: Sequelize.STRING,       
      },
      partner_key: {
        type: Sequelize.STRING,       
      },
      api_key: {
        type: Sequelize.STRING,      
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
    await queryInterface.dropTable('Users');
  }
};