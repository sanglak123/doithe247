'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cards', [
      {
        telco: "VIETTEL",
        idTypeCard: 1       
      },
      {
        telco: "VINAPHONE",
        idTypeCard: 1       
      },     
      {
        telco: "MOBIFONE",
        idTypeCard: 1       
      },
      {
        telco: "VNMOBI",
        idTypeCard: 1       
      },
      {
        telco: "ZING",
        idTypeCard: 2      
      },
      {
        telco: "GARENA",
        idTypeCard: 2       
      },
      {
        telco: "GATE",
        idTypeCard: 2       
      },
      {
        telco: "VCOIN",
        idTypeCard: 2      
      },
      {
        telco: "APPOTA",
        idTypeCard: 2      
      },
      {
        telco: "ANPAY",
        idTypeCard: 2
      },
      {
        telco: "AVG",      
        idTypeCard: 2
      },
      {
        telco: "BITVN",     
        idTypeCard: 2
      },
      {
        telco: "CAROT",      
        idTypeCard: 2
      },
      {
        telco: "FUNCARD",      
        idTypeCard: 2
      },
      {
        telco: "GMOBILE",     
        idTypeCard: 2
      },
      {
        telco: "GOSU",     
        idTypeCard: 2
      },
      {
        telco: "KASPERKY",    
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
