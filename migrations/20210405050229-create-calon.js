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
      noHp: {
        type: Sequelize.STRING,
      },
      pendidikan: {
        type: Sequelize.STRING,
      },
      ipk: {
        type: Sequelize.FLOAT,
      },
      mengajar: {
        type: Sequelize.FLOAT,
      },
      karyaIlmiah: {
        type: Sequelize.FLOAT,
      },
      keahlian: {
        type: Sequelize.FLOAT,
      },
      sertifikat: {
        type: Sequelize.FLOAT,
      },
      psikologi: {
        type: Sequelize.FLOAT,
      },
      kompetensi: {
        type: Sequelize.FLOAT,
      },
      kesehatan: {
        type: Sequelize.FLOAT,
      },
      berinteraksi: {
        type: Sequelize.FLOAT,
      },
      nilai: {
        type: Sequelize.FLOAT,
      },
      rank: {
        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
