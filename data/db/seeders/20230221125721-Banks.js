'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Banks', [
      {
        name: "Á Châu",
        sign: "ACB"
      },
      {
        name: "Quân Đội",
        sign: "MB"
      },
      {
        name: "MoMo",
        sign: "MOMO"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Banks', null, {});
  }
};
