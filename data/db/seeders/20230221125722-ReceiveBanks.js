'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ReceiveBanks', [
      {
        idBank: 1,
        number: "12908987",
        owner: "Huỳnh Trúc Sang",
        branch: "Phú Nhuận"       
      },
       {
        idBank: 2,
        number: "797926011991",
        owner: "Huỳnh Trúc Sang",
        branch: "Phú Nhuận"
      },
       {
        idBank: 3,
        number: "0943830707",
        owner: "Huỳnh Trúc Sang",     
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ReceiveBanks', null, {});
  }
};
