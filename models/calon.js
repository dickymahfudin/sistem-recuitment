'use strict';
const {
  Model
} = require('sequelize');
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
  };
  calon.init({
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    noHp: DataTypes.STRING,
    pendidikan: DataTypes.STRING,
    ipk: DataTypes.FLOAT,
    mengajar: DataTypes.FLOAT,
    karyaIlmiah: DataTypes.FLOAT,
    keahlian: DataTypes.FLOAT,
    sertifikat: DataTypes.FLOAT,
    psikologi: DataTypes.FLOAT,
    kompetensi: DataTypes.FLOAT,
    kesehatan: DataTypes.FLOAT,
    berinteraksi: DataTypes.FLOAT,
    nilai: DataTypes.FLOAT,
    rank: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'calon',
  });
  return calon;
};