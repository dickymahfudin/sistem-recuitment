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
  const { nama, alamat, noHp } = req.body;
  await calon
    .create({ nama, alamat, noHp })
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
  const { id } = req.params;
  const {
    nama,
    alamat,
    nohp,
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
    nilai,
    rank,
  } = req.body;

  const data = {
    nama,
    alamat,
    nohp,
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

router.get("/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  const findCalon = await calon.findByPk(id);
  await findCalon.destroy();
  req.flash("success", "Data Berhasil Dihapus");
  res.redirect("/calon");
});
module.exports = router;
