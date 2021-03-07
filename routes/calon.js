const express = require("express");
const router = express.Router();
const { calon } = require("../models");

router.get("/", async (req, res, next) => {
  const datas = await calon.findAll({ order: [["id", "ASC"]] });
  res.render("./calon/index", { datas, title: "Calon" });
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  await calon.findByPk(id).then((result) => {
    return res.status(200).json({
      status: "success",
      data: result,
    });
  });
  // res.render("./calon/index", { datas, title: "Calon" });
});

router.post("/", async (req, res, next) => {
  const { nama, alamat, no_hp } = req.body;
  console.log(nama);
  await calon
    .create({ nama, alamat, no_hp })
    .then((result) => {
      req.flash("success", "Data Berhasil Ditambahkan");
      res.redirect("/calon");
    })
    .catch((err) => {
      req.flash("error", "Terjadi Kesalahan");
      res.redirect("/calon");
    });
});

router.post("/:id", async (req, res, next) => {
  console.log("MASUK SINI");
  const { id } = req.params;
  const {
    nama,
    alamat,
    no_hp,
    materi,
    pemrograman,
    tanggung_jawab,
    jaringan,
    metode,
    sistem,
    alat,
    web,
    bInggris,
    berinteraksi,
    mengajar,
    presentrasi,
    nilai,
    rank,
  } = req.body;

  const data = {
    nama,
    alamat,
    no_hp,
    materi,
    pemrograman,
    tanggung_jawab,
    jaringan,
    metode,
    sistem,
    alat,
    web,
    bInggris,
    berinteraksi,
    mengajar,
    presentrasi,
    nilai,
    rank,
  };
  const findCalon = await calon.findByPk(id);

  await findCalon.update(data);
  req.flash("success", "Data Berhasil Perbaruhi");
  res.redirect("/calon");
  // return res.json({
  //   status: "success",
  //   data,
  // });
});

module.exports = router;
