'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Imgs', [
      {
        fileName: "viettel.png",
        path: "/img/logo/viettel.png",
      },
      {
        fileName: "vinaphone.jpeg",
        path: "/img/logo/vinaphone.jpeg",
      },
      {
        fileName: "mobifone.jpeg",
        path: "/img/logo/mobifone.jpeg",
      },
      {
        fileName: "vietnamobile.jpeg",
        path: "/img/logo/vietnamobile.jpeg",

      },
      {
        fileName: "zing.png",
        path: "/img/logo/zing.png",

      },
      {
        fileName: "garena.png",
        path: "/img/logo/garena.png",

      },
      {
        fileName: "gate.png",
        path: "/img/logo/gate.png",

      },
      {
        fileName: "vcoin.png",
        path: "/img/logo/vcoin.png",

      },
      {
        fileName: "appota.png",
        path: "/img/logo/appota.png",

      },
      {
        fileName: "anpay.jpeg",
        path: "/img/logo/anpay.jpeg",
      },
      {
        fileName: "avg.jpg",
        path: "/img/logo/avg.jpg",
      },
      {
        fileName: "bitvn.jpg",
        path: "/img/logo/bitvn.jpg",
      },
      {
        fileName: "Carot.jpg",
        path: "/img/logo/Carot.jpg",
      },
      {
        fileName: "funcard.jpg",
        path: "/img/logo/funcard.jpg",
      },
      {
        fileName: "gmobile.jpg",
        path: "/img/logo/gmobile.jpg",
      },
      {
        fileName: "gosu.png",
        path: "/img/logo/gosu.png",
      },
      {
        fileName: "kaspersky.png",
        path: "/img/logo/kaspersky.png",
      },
      {
        fileName: "kcong.jpg",
        path: "/img/logo/kcong.jpg",
      },
      {
        fileName: "kul.jpeg",
        path: "/img/logo/kul.jpeg",
      },
      {
        fileName: "oncash.jpeg",
        path: "/img/logo/oncash.jpeg",
      },
      {
        fileName: "scoin.jpg",
        path: "/img/logo/scoin.jpg",
      },
      {
        fileName: "sohacoin.png",
        path: "/img/logo/sohacoin.png",
      },
      {
        fileName: "vega.png",
        path: "/img/logo/vega.png",
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Imgs', null, {});
  }
};
