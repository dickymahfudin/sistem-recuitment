"use strict";
const faker = require("faker");
const impikasiFuzzy = require("../helpers");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let result = [];
    for (let i = 0; i < 20; i++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const prefix = faker.name.prefix();
      const suffix = faker.name.suffix();
      const streetAddress = faker.address.streetAddress();
      const streetName = faker.address.streetName();
      const noHp = faker.phone.phoneNumberFormat();
      const nama = `${prefix} ${firstName} ${lastName} ${suffix}`;
      const alamat = `${streetAddress} ${streetName}`;
      const materi = faker.random.float({ min: 0, max: 10 }),
        pemrograman = faker.random.float({ min: 0, max: 10 }),
        tanggungJawab = faker.random.float({ min: 0, max: 10 }),
        jaringan = faker.random.float({ min: 0, max: 10 }),
        sistem = faker.random.float({ min: 0, max: 10 }),
        metode = faker.random.float({ min: 0, max: 10 }),
        alat = faker.random.float({ min: 0, max: 10 }),
        web = faker.random.float({ min: 0, max: 10 }),
        bInggris = faker.random.float({ min: 0, max: 10 }),
        berinteraksi = faker.random.float({ min: 0, max: 10 }),
        mengajar = faker.random.float({ min: 0, max: 10 }),
        presentrasi = faker.random.float({ min: 0, max: 10 });

      const data = {
        materi,
        pemrograman,
        tanggungJawab,
        jaringan,
        metode,
        sistem,
        alat,
        web,
        bInggris,
        berinteraksi,
        mengajar,
        presentrasi,
      };
      const defuzi = impikasiFuzzy(data);
      const defuzifikasi = defuzi.defuzifikasi ? defuzi.defuzifikasi : 0;
      result.push({
        ...data,
        nama,
        alamat,
        noHp,
        nilai: defuzifikasi,
        rank: defuzi.rank,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert("calons", result);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("calons", null, {});
  },
};
