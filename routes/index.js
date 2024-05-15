var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/login", function (req, res, next) {
  res.render("auth/login");
});
router.get("/register", function (req, res, next) {
  res.render("auth/register");
});
router.get("/paket", function (req, res, next) {
  res.render("paket");
});
router.get("/detailpaket", function (req, res, next) {
  res.render("paket/detailpaket");
});

module.exports = router;
