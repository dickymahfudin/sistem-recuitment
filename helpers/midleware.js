module.exports = (req, res, next) => {
  if (req.session.login) {
    next();
  } else {
    console.log("masuk");
    res.redirect("/login");
  }
};
