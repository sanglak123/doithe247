'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cards', [
      {
        telco: "VIETTEL",
        idTypeCard: 1,
        img: 1
      },
      {
        telco: "VINAPHONE",
        idTypeCard: 1,
        img: 2
      },     
      {
        telco: "MOBIFONE",
        idTypeCard: 1,
        img: 3
      },
      {
        telco: "VNMOBI",
        idTypeCard: 1,
        img: 4
      },
      {
        telco: "ZING",
        idTypeCard: 2,
        img: 5
      },
      {
        telco: "GARENA",
        idTypeCard: 2,
        img: 6
      },
      {
        telco: "GATE",
        idTypeCard: 2,
        img: 7
      },
      {
        telco: "VCOIN",
        idTypeCard: 2,
        img: 8
      },
      {
        telco: "APPOTA",
        idTypeCard: 2,
        img: 9
      },
      {
        telco: "ANPAY",
        idTypeCard: 2
      },
      {
        telco: "AVG",
        img: 12,
        idTypeCard: 2
      },
      {
        telco: "BITVN",
        img: 13,
        idTypeCard: 2
      },
      {
        telco: "CAROT",
        img: 14,
        idTypeCard: 2
      },
      {
        telco: "FUNCARD",
        img: 15,
        idTypeCard: 2
      },
      {
        telco: "GMOBILE",
        img: 16,
        idTypeCard: 2
      },
      {
        telco: "GOSU",
        img: 17,
        idTypeCard: 2
      },
      {
        telco: "KASPERKY",
        img: 18,
        idTypeCard: 2
      },
      {
        telco: "KCONG",
        idTypeCard: 2
      },
      {
        telco: "KUL",   
        idTypeCard: 2
      },
      {
        telco: "ONCASH",     
        idTypeCard: 2
      },
      {
        telco: "SCOIN", 
        idTypeCard: 2
      },
      {
        telco: "SOHACOIN",      
        idTypeCard: 2
      },
      {
        telco: "VEGA",   
        idTypeCard: 2
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cards', null, {});
  }
};
