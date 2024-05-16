var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("admin/index");
});
router.get("/paket", function (req, res, next) {
  res.render("admin/paket");
});
router.get("/tambahpaket", function (req, res, next) {
  res.render("admin/tambahpaket");
});
router.get("/tambahwisata", function (req, res, next) {
  res.render("admin/tambahwisata");
});
router.get("/wisata", function (req, res, next) {
  res.render("admin/wisata");
});
router.get("/tambahpesan", function (req, res, next) {
  res.render("admin/tambahpesan");
});
router.get("/pesan", function (req, res, next) {
  res.render("admin/pesan");
});

module.exports = router;
