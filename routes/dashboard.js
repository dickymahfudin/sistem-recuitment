const express = require("express");
const router = express.Router();
const { calon } = require("../models");

router.get("/", async (req, res, next) => {
  const calons = await calon.findAll({ order: [["nilai", "ASC"]] });
  calons.map((e) => {
    e.status = e.status ? "Sudah Dinilai" : "Belum Dinilai";
    e.mengajar =
      e.mengajar === 1
        ? "Kurang Dari 6 Bulan"
        : e.mengajar === 2
        ? "6 Bulan Sampai 1.5 Tahun"
        : "Lebih dari 2 Tahun";

    e.karyaIlmiah =
      e.karyaIlmiah === 1
        ? "Tidak Ada"
        : e.karyaIlmiah === 2
        ? "Sedikit"
        : "Banyak";

    e.materi =
      e.materi === 1 ? "Kurang Baik" : e.materi === 2 ? "Cukup" : "Baik";

    e.sertifikat = e.sertifikat === 1 ? "Tidak Linier" : "Linier";

    e.toefl =
      e.toefl === 1
        ? "Kurang dari 100"
        : e.toefl === 2
        ? "100 Sampai 200"
        : "lebih dari 200";

    e.kesehatan =
      e.kesehatan === 1 ? "Kurang Baik" : e.kesehatan === 2 ? "Cukup" : "Baik";

    e.berinteraksi =
      e.berinteraksi === 1
        ? "Kurang Baik"
        : e.berinteraksi === 2
        ? "Cukup"
        : "Baik";
  });
  const calonFalse = calons.filter((e) => e.status == false).length;
  const rankA = calons.filter((e) => e.rank == "A").length;
  const rankB = calons.filter((e) => e.rank == "B").length;
  const rankC = calons.filter((e) => e.rank == "C").length;
  const rankD = calons.filter((e) => e.rank == "D").length;

  res.render("dashboard", {
    title: "Dashboard",
    calons,
    calonFalse,
    rankA,
    rankB,
    rankC,
    rankD,
  });
});

module.exports = router;
