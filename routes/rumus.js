const express = require("express");
const router = express.Router();
const rumus = require("../helpers");
const { calon } = require("../models");

router.get("/", async (req, res, next) => {
  res.render("rumus", { title: "Calon" });
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const findCalon = await calon.findByPk(id);
  const tampilRumus = rumus(findCalon);
  res.render("rumus", { tampilRumus, title: "Calon" });
});

module.exports = router;
