const express = require("express");
const router = express.Router();
const { calon } = require("../models");
const impikasiFuzzy = require("../helpers");

router.get("/", async (req, res, next) => {
  const datas = await calon.findAll({
    where: { status: false },
    order: [["id", "ASC"]],
  });
  res.render("penilaian", { title: "Penilaian", datas });
});

router.post("/", async (req, res, next) => {
  const {
    id,
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
  } = req.body;
  const data = {
    pendidikan,
    ipk,
    mengajar: +mengajar,
    karyaIlmiah: +karyaIlmiah,
    materi: +materi,
    sertifikat: +sertifikat,
    toefl: +toefl,
    kompetensi: +kompetensi,
    kesehatan: +kesehatan,
    berinteraksi: +berinteraksi,
  };
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
