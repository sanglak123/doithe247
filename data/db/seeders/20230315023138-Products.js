'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        idUser: 1,
        command: "buy",
        idPrice: 1,
        feesChange: "9.5",
        receiveValue: "48",
        code: "15631287564489425",
        serial: "5648911235423689753",
        sign: "SSS45",
        request_id: "QVJFFRECF",
        status: "Pending"
      },
      {
        idUser: 1,
        command: "buy",
        idPrice: 3,
        feesChange: "9.5",
        receiveValue: "48",
        code: "15631287564489425",
        serial: "5648911235423689753",
        sign: "SSS45",
        request_id: "QVJFFRECF",
        status: "Pending"
      },
      {
        idUser: 1,
        command: "buy",
        idPrice: 5,
        feesChange: "9.5",
        receiveValue: "48",
        code: "15631287564489425",
        serial: "5648911235423689753",
        sign: "SSS46",
        request_id: "QVJFFRECF",
        status: "Pending"
      },
      {
        idUser: 1,
        command: "buy",
        idPrice: 6,
        feesChange: "9.5",
        receiveValue: "48",
        code: "15631287564489425",
        serial: "5648911235423689753",
        sign: "SSS46",
        request_id: "QVJFFRECF",
        status: "Pending"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
