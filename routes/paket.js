const express = require('express');
const router = express.Router();
const PaketModel = require('../models/model_paket.js');
const WisataModel = require('../models/model_wisata.js');

// Route to get all packages
router.get('/', async function (req, res, next) {
  try {
    let rows = await PaketModel.getAll();
    res.render('paket/index', {
      data: rows,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/create', async function (req, res, next) {
    try {
      let wisataList = await WisataModel.getAll();
      res.render('paket/create', {
        idWisataList: wisataList,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

// Route to store new package
router.post('/store', async function (req, res, next) {
  try {
    let { nama, deskripsi, harga, id_wisata } = req.body;
    let newData = {
      nama,
      deskripsi,
      harga,
      id_wisata,
    };
    await PaketModel.create(newData);
    req.flash('success', 'Berhasil menyimpan data');
    res.redirect('/admin/paket');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Gagal menyimpan data');
    res.redirect('/admin/paket');
  }
});

// Route to get the edit page
router.get('/edit/:id', async function (req, res, next) {
  try {
    let id = req.params.id;
    let paket = await PaketModel.getById(id);
    if (!paket) {
      return res.status(404).send('Paket tidak ditemukan');
    }
    let wisataList = await WisataModel.getAll();
    res.render('paket/edit', {
      data: paket,
      wisata: wisataList,
    });
  } catch (error) {
    console.error(error);
    res.redirect('/admin/paket');
  }
});

// Route to update a package
router.post('/update/:id', async function (req, res, next) {
  try {
    let id = req.params.id;
    let { nama, deskripsi, harga, id_wisata } = req.body;
    let newData = {
      nama,
      deskripsi,
      harga,
      id_wisata,
    };
    await PaketModel.update(id, newData);
    req.flash('success', 'Berhasil memperbarui data');
    res.redirect('/admin/paket');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Gagal memperbarui data');
    res.redirect('/admin/paket');
  }
});

// Route to delete a package
router.get('/delete/:id', async function (req, res, next) {
  try {
    let id = req.params.id;
    await PaketModel.remove(id);
    req.flash('success', 'Berhasil menghapus data');
    res.redirect('/admin/paket');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Gagal menghapus data');
    res.redirect('/admin/paket');
  }
});

module.exports = router;
