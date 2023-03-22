'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        idUser: 1,
        command: "change",
        idPrice: 1,
        feesChange: "12",
        receiveValue: "8.8",
        code: "1568756489425",
        serial: "56489154689753",
        sign: "QVLTK-1589655-CNFCF",
        request_id: "QVJFFLTK-15894545655-CNFTGCF",
        status: "Success"
      },
      {
        idUser: 1,
        command: "change",
        idPrice: 5,
        feesChange: "9.5",
        receiveValue: "48",
        code: "15687564489425",
        serial: "5648915423689753",
        sign: "QRBBVLTK-1589655-CNFCF",
        request_id: "QVJFFLTK-15894545655-CNFTGCF",
        status: "Success"
      },
      {
        idUser: 1,
        command: "change",
        idPrice: 5,
        feesChange: "9.5",
        receiveValue: "48",
        code: "15687564489425",
        serial: "5648915423689753",
        sign: "QRBBVLTK-1589655-CNFCF",
        request_id: "QVJFFLTK-15894545655-CNFTGCF",
        status: "Error"
      },
      {
        idUser: 1,
        command: "change",
        idPrice: 5,
        feesChange: "9.5",
        receiveValue: "48",
        code: "15631287564489425",
        serial: "5648911235423689753",
        sign: "QRBBVFRRLTK-1589655-CEERGNFCF",
        request_id: "QVJFFRECF",
        status: "Pending"
      },
      {
        idUser: 1,
        command: "buy",
        idPrice: 1,
        feesBuy: "4.5",
        code: "1568945682315",
        serial: "45986215648795",
        status: "Success",
        count: 3
      },
      {
        idUser: 1,
        command: "buy",
        idPrice: 6,
        feesBuy: "4.5",
        code: "1568945682315",
        serial: "45986215648795",
        status: "Success",
        count: 3
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
