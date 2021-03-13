"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class calon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  calon.init(
    {
      nama: DataTypes.STRING,
      alamat: DataTypes.STRING,
      noHp: DataTypes.STRING,
      materi: DataTypes.FLOAT,
      pemrograman: DataTypes.FLOAT,
      tanggungJawab: DataTypes.FLOAT,
      jaringan: DataTypes.FLOAT,
      metode: DataTypes.FLOAT,
      sistem: DataTypes.FLOAT,
      alat: DataTypes.FLOAT,
      web: DataTypes.FLOAT,
      bInggris: DataTypes.FLOAT,
      berinteraksi: DataTypes.FLOAT,
      mengajar: DataTypes.FLOAT,
      presentrasi: DataTypes.FLOAT,
      nilai: DataTypes.FLOAT,
      rank: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "calon",
    }
  );
  return calon;
};
