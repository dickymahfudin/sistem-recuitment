const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const favicon = require("serve-favicon");
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/index");
const flash = require("express-flash");
const session = require("express-session");

const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const calonRouter = require("./routes/calon");
const dashboardRouter = require("./routes/dashboard");
const penilaianRouter = require("./routes/penilaian");
const rumusRouter = require("./routes/rumus");
const midleware = require("./helpers/midleware");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(
  session({
    cookie: { maxAge: 6000000 },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: "true",
    secret: "secret",
  })
);
app.use(flash());

// app.use("/users", midleware, usersRouter);
app.use("/login", loginRouter);
app.use("/calon", midleware, calonRouter);
app.use("/dashboard", midleware, dashboardRouter);
app.use("/penilaian", midleware, penilaianRouter);
app.use("/rumus", midleware, rumusRouter);

// catch 404 and forward to error handler
// app.use((req, res, next) => next(createError(404)));

app.get("*", midleware, (req, res) => res.redirect("/dashboard"));
// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
