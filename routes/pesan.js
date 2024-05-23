var express = require('express');
var router = express.Router();
const model_pesan = require('../models/model_pesan');

// Route untuk menampilkan semua pesan
router.get('/', async function(req, res, next) {
    try {
        let rows = await model_pesan.getAll();
        res.render('pesan/index', {
            data: rows
        });
    } catch (error) {
        console.error('Error:', error);
        req.flash('error', 'Gagal memuat data pesan');
        res.redirect('/admin');
    }
});

// Route untuk menampilkan form tambah pesan
router.get('/create', async function(req, res, next) {
    // Di sini Anda dapat menambahkan logika untuk mengambil data yang diperlukan dari model lain jika diperlukan
    res.render('pesan/create');
});

// Route untuk menambahkan pesan baru
router.post('/store', async function(req, res, next) {
    try {
        let { nama, nama_paket, id_akun, id_paket } = req.body;
        let data = {
            nama,
            nama_paket,
            id_akun,
            id_paket,
        };
        await model_pesan.create(data);
        req.flash('success', 'Berhasil menyimpan data pesan');
        res.redirect('/pesan');
    } catch (error) {
        console.error('Error:', error);
        req.flash('error', 'Gagal menyimpan data pesan');
        res.redirect('/pesan');
    }
});

// Route untuk menampilkan form edit pesan
router.get('/edit/:id', async function(req, res, next) {
  try {
      let id = req.params.id;
      let pesan = await model_pesan.getById(id);
      res.render('pesan/edit', {
          pesan: pesan
      });
  } catch (error) {
      console.error('Error:', error);
      req.flash('error', 'Gagal memuat halaman edit pesan');
      res.redirect('/pesan');
  }
});

// Route untuk menyimpan perubahan pada pesan yang diedit
router.post('/update/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let { nama, nama_paket, id_akun, id_paket } = req.body;
        let data = {
            nama,
            nama_paket,
            id_akun,
            id_paket,
        };
        await model_pesan.update(id, data);
        req.flash('success', 'Berhasil update data pesan');
        res.redirect('/pesan');
    } catch (error) {
        console.error('Error:', error);
        req.flash('error', 'Gagal menyimpan data pesan');
        res.redirect('/pesan');
    }
});

// Route untuk menghapus pesan
router.get('/delete/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        await model_pesan.remove(id);
        req.flash('success', 'Berhasil menghapus data pesan');
        res.redirect('/pesan');
    } catch (error) {
        console.error('Error:', error);
        req.flash('error', 'Gagal menghapus data pesan');
        res.redirect('/pesan');
    }
});

module.exports = router;
