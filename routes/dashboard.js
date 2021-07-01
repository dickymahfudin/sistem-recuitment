const express = require("express");
const router = express.Router();
const { calon } = require("../models");

router.get("/", async (req, res, next) => {
  const tempCaloncalons = await calon.findAll({ order: [["nilai", "ASC"]] });
  tempCaloncalons.map((e) => {
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

  const calons = await calon.findAll({
    where: { status: true },
    order: [["nilai", "ASC"]],
  });
  const calonFalse = await calon.findAll({
    where: { status: false },
    order: [["nilai", "ASC"]],
  });
  console.log(calonFalse.length);
  const rankA = tempCaloncalons.filter((e) => e.rank == "A").length;
  const rankB = tempCaloncalons.filter((e) => e.rank == "B").length;
  const rankC = tempCaloncalons.filter((e) => e.rank == "C").length;
  const rankD = tempCaloncalons.filter((e) => e.rank == "D").length;

  res.render("dashboard", {
    title: "Dashboard",
    calons,
    calonFalse: calonFalse.length,
    rankA,
    rankB,
    rankC,
    rankD,
  });
});

module.exports = router;
