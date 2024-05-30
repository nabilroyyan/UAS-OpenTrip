var express = require("express");
var router = express.Router();
const ModelWisata = require('../models/model_wisata');
const model_paket = require("../models/model_paket");
const ModelPesan = require("../models/model_pesan");

router.get("/", function (req, res, next) {
  res.render("admin/index");
});

// Route untuk menampilkan semua paket
router.get("/paket", async function (req, res, next) {
  try {
    let data = await ModelPaket.getAll();
    res.render("admin/paket", { data: data });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});



// Route untuk menampilkan form tambah paket
router.get("/tambahpaket", async function (req, res, next) {
  try {
    let data_paket = await model_paket.getAll();
    res.render("admin/tambahpaket", { data_paket: data_paket });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route untuk menampilkan form edit paket berdasarkan ID
router.get("/editpaket/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let paket = await ModelPaket.getById(id);
    let data_wisata = await ModelWisata.getAll();
    res.render("admin/editpaket", { paket: paket, data_wisata: data_wisata });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route untuk menampilkan semua objek wisata
router.get("/wisata", async function (req, res, next) {
  try {
    let data = await ModelWisata.getAll();
    res.render('admin/wisata', { data: data });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Route untuk menampilkan form tambah wisata
router.get("/tambahwisata", function (req, res, next) {
  res.render("admin/tambahwisata");
});

// Route untuk menampilkan form edit wisata berdasarkan ID
router.get("/editwisata/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let rows = await ModelWisata.getById(id);
    res.render('admin/editwisata', {
      data: rows,
      id: rows[0].id_wisata,
      nama: rows[0].nama,
      alamat: rows[0].alamat, 
      deskripsi: rows[0].deskripsi,
      gambar: rows[0].gambar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/pesan", async function (req, res, next) {
  try {
    let data_pesan = await ModelPesan.getAll();
    res.render("admin/pesan", { data_pesan: data_pesan }); // Meneruskan data pesan ke template ejs
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/tambahpesan", async function (req, res, next) {
  try {
    let data_paket = await model_paket.getAll();
    res.render("admin/tambahpesan", { data_paket: data_paket });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/editpesan/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let pesan = await model_pesan.getById(id);
    let data_paket = await model_paket.getAll();
    res.render("admin/editpesan", { pesan: pesan, data_paket: data_paket });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
