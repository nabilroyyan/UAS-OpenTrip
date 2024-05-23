var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const ModelWisata = require('../models/model_wisata');
const ModelPaket = require('../models/model_paket');
const model_paket = require("../models/model_paket");
const model_wisata = require("../models/model_wisata");


router.get("/", function (req, res, next) {
  res.render("admin/index");
});
router.get("/paket",async function (req, res, next) {
  let data = await model_paket.getAll();
  res.render("admin/paket", { data: data });
});
router.get("/tambahpaket",async function (req, res, next) {
  let data_wisata = await model_wisata.getAll();
  res.render("admin/tambahpaket",{data_wisata: data_wisata});
});

router.get("/wisata",async function (req, res, next) {
  let data = await model_wisata.getAll();
  res.render('admin/wisata',{ data: data });
});
router.get("/tambahwisata", function (req, res, next) {
  res.render("admin/tambahwisata");
});
router.get("/editwisata/(:id)", async function (req, res, next) {
  try {
    let id = req.params.id;
    let rows = await model_wisata.getById(id);
    res.render('admin/editwisata', {
        data: rows,
        id: rows[0].id_wisata,
        nama: rows[0].nama,
        alamat: rows[0].alamat, 
        deskripsi: rows[0].deskripsi,
        gambar: rows[0].gambar,
    });
} catch (error) {
    res.redirect('/wisata');
    console.error(error);
}
});

router.get("/pesan", function (req, res, next) {
  res.render("admin/pesan");
});
router.get("/tambahpesan", function (req, res, next) {
  res.render("admin/tambahpesan");
});



module.exports = router;
