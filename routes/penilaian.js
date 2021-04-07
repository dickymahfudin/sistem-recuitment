const express = require("express");
const router = express.Router();
const { calon } = require("../models");
const impikasiFuzzy = require("../helpers");

router.get("/", async (req, res, next) => {
  const forms = [
    { name: "mengajar", placeholder: "Pengalaman Mengajar" },
    {
      name: "karyaIlmiah",
      placeholder: "Memiliki Publikasi Dalam Karya Ilmiah",
    },
    {
      name: "keahlian",
      placeholder: "Kecakapan Dalam Memberikan Materi Perkuliahan",
    },
    { name: "sertifikat", placeholder: "Memiliki Sertifikat Keahlian" },
    { name: "psikologi", placeholder: "Nilai Test Psikologi" },
    { name: "kompetensi", placeholder: "Nilai Dari Seleksi Kompetensi" },
    { name: "kesehatan", placeholder: "Nilai Dari Test Kesehatan" },
    { name: "berinteraksi", placeholder: "Kemampuan Berinteraksi" },
  ];
  const datas = await calon.findAll({
    where: { status: false },
    order: [["id", "ASC"]],
  });
  res.render("penilaian", { title: "Penilaian", forms, datas });
});

router.post("/", async (req, res, next) => {
  const {
    id,
    pendidikan,
    ipk,
    mengajar,
    karyaIlmiah,
    keahlian,
    sertifikat,
    psikologi,
    kompetensi,
    kesehatan,
    berinteraksi,
  } = req.body;
  const data = {
    pendidikan,
    ipk,
    mengajar,
    karyaIlmiah,
    keahlian,
    sertifikat,
    psikologi,
    kompetensi,
    kesehatan,
    berinteraksi,
  };
  console.log(data);
  const defuzi = impikasiFuzzy(data);
  const dataCalon = await calon.findByPk(id);
  await dataCalon.update({
    ...data,
    nilai: defuzi.defuzifikasi,
    rank: defuzi.rank,
    status: true,
  });
  res.redirect("/calon");
});

module.exports = router;
