var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("admin/index");
});
router.get("/paket", function (req, res, next) {
  res.render("admin/paket");
});

module.exports = router;
