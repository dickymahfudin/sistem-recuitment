"use strict";
const faker = require("faker");
const impikasiFuzzy = require("../helpers");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let result = [];
    for (let i = 0; i < 5; i++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const prefix = faker.name.prefix();
      const suffix = faker.name.suffix();
      const streetAddress = faker.address.streetAddress();
      const streetName = faker.address.streetName();
      const noHp = faker.phone.phoneNumberFormat();
      const nama = `${prefix} ${firstName} ${lastName} ${suffix}`;
      const alamat = `${streetAddress} ${streetName}`;
      const pendidikan = faker.random.boolean() ? "S2" : "S3",
        ipk = faker.random.float({ min: 3, max: 4 }),
        mengajar = faker.random.float({ min: 1, max: 3 }),
        karyaIlmiah = faker.random.float({ min: 1, max: 3 }),
        materi = faker.random.float({ min: 1, max: 3 }),
        sertifikat = faker.random.float({ min: 1, max: 3 }),
        toefl = faker.random.float({ min: 1, max: 3 }),
        kompetensi = faker.random.float({ min: 1, max: 3 }),
        kesehatan = faker.random.float({ min: 1, max: 3 }),
        berinteraksi = faker.random.float({ min: 1, max: 3 });

      const data = {
        pendidikan,
        ipk,
        mengajar,
        karyaIlmiah,
        materi,
        sertifikat,
        toefl,
        kompetensi,
        kesehatan,
        berinteraksi,
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
