"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("calons", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama: {
        type: Sequelize.STRING,
      },
      alamat: {
        type: Sequelize.STRING,
      },
      no_hp: {
        type: Sequelize.STRING,
      },
      materi: {
        type: Sequelize.FLOAT,
      },
      pemrograman: {
        type: Sequelize.FLOAT,
      },
      tanggung_jawab: {
        type: Sequelize.FLOAT,
      },
      jaringan: {
        type: Sequelize.FLOAT,
      },
      metode: {
        type: Sequelize.FLOAT,
      },
      sistem: {
        type: Sequelize.FLOAT,
      },
      alat: {
        type: Sequelize.FLOAT,
      },
      web: {
        type: Sequelize.FLOAT,
      },
      bInggris: {
        type: Sequelize.FLOAT,
      },
      berinteraksi: {
        type: Sequelize.FLOAT,
      },
      mengajar: {
        type: Sequelize.FLOAT,
      },
      presentrasi: {
        type: Sequelize.FLOAT,
      },
      nilai: {
        type: Sequelize.FLOAT,
      },
      rank: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("calons");
  },
};
