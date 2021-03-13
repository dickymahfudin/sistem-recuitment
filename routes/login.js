const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  if (req.session.login) res.redirect("/dashboard");
  res.render("login", { login: true, title: "Login" });
});

router.post("/", (req, res, next) => {
  const { username, password } = req.body;
  if (username == "admin" && password == "admin123") {
    req.session.login = true;
    res.redirect("/dashboard");
  } else {
    req.flash("error", "fea");
    res.redirect("/login");
  }
});

router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
  });
  res.redirect("/login");
});

module.exports = router;
