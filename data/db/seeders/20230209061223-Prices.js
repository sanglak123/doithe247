'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Prices', [
      {
        idCard: 1,
        idValue: 1,
        feesChange: 15,
        feesBuy: 5
      },
      {
        idCard: 1,
        idValue: 2,
        feesChange: 15,
        feesBuy: 5
      },
      {
        idCard: 1,
        idValue: 3,
        feesChange: 15,
        feesBuy: 5
      },
      {
        idCard: 1,
        idValue: 4,
        feesChange: 15,
        feesBuy: 5
      },
      {
        idCard: 1,
        idValue: 5,
        feesChange: 15,
        feesBuy: 5
      },
      {
        idCard: 1,
        idValue: 6,
        feesChange: 15,
        feesBuy: 5
      },
      {
        idCard: 1,
        idValue: 7,
        feesChange: 15,
        feesBuy: 5
      },
      {
        idCard: 1,
        idValue: 8,
        feesChange: 15,
        feesBuy: 5
      },
      {
        idCard: 1,
        idValue: 9,
        feesChange: 15,
        feesBuy: 5
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Prices', null, {});
  }
};
