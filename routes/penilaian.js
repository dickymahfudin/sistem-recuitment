const express = require("express");
const router = express.Router();
const { calon } = require("../models");
const impikasiFuzzy = require("../helpers");

router.get("/", async (req, res, next) => {
  const forms = [
    { name: "materi", placeholder: "Penyampaian Materi" },
    { name: "pemrograman", placeholder: "Menguasai Bahasa Pemrograman" },
    { name: "tanggungJawab", placeholder: "Rasa Tanggung Jawab" },
    { name: "jaringan", placeholder: "Pemahaman Tentang Jaringan" },
    { name: "metode", placeholder: "Pemahaman Tentang Metode" },
    { name: "sistem", placeholder: "Pemahaman Tentang Sistem" },
    { name: "alat", placeholder: "Pemahaman Tentang Alat" },
    { name: "web", placeholder: "Pemahaman Tentang Web" },
    { name: "bInggris", placeholder: "Pemahaman Bahasa Inggris" },
    { name: "berinteraksi", placeholder: "Kemampuan Berinteraksi" },
    { name: "mengajar", placeholder: "Pengalaman Mengajar" },
    { name: "presentrasi", placeholder: "Kemampuan Berpresentasi" },
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
  } = req.body;
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
