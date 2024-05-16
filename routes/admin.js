var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const ModelWisata = require('../models/model_wisata');


router.get("/", function (req, res, next) {
  res.render("admin/index");
});
router.get("/paket", function (req, res, next) {
  res.render("admin/paket");
});
router.get("/tambahpaket", async function (req, res, next) {
  try {
    let wisataList = await ModelWisata.getAll();
    res.render("admin/tambahpaket", { idWisataList: wisataList });
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});
router.get("/tambahwisata", function (req, res, next) {
  res.render("admin/tambahwisata");
});
router.get("/wisata",async function (req, res, next) {
  let data = await ModelWisata.getAll();
  res.render('admin/wisata',{ data: data });
});
router.get("/tambahpesan", function (req, res, next) {
  res.render("admin/tambahpesan");
});
router.get("/pesan", function (req, res, next) {
  res.render("admin/pesan");
});


module.exports = router;
