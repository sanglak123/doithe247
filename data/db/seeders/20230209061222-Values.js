'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Values', [
      {
        name: '10000'
      },
      {
        name: '20000'
      },
      {
        name: '30000'
      },
      {
        name: '50000'
      },
      {
        name: '100000'
      },
      {
        name: '200000'
      },
      {
        name: '300000'
      },
      {
        name: '500000'
      },
      {
        name: '1000000'
      },
      {
        name: '2000000'
      },
      {
        name: '3000000'
      },
      {
        name: '5000000'
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Values', null, {});
  }
};
