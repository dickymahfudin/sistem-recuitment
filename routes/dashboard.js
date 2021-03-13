const express = require("express");
const router = express.Router();
const { calon } = require("../models");

router.get("/", async (req, res, next) => {
  const calons = await calon.findAll({ order: [["nilai", "ASC"]] });
  calons.map((e) => (e.status = e.status ? "Sudah Dinilai" : "Belum Dinilai"));
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
