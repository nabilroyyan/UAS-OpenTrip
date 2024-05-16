var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser'); // Import body-parser
const ModelPaket = require('../models/model_paket');
const ModelWisata = require('../models/model_wisata.js');

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", async function (req, res, next) {
    try {
        let paket = await ModelPaket.getAll();
        res.render("admin/paket", {
            data: paket,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
});


router.get('/create', async function(req, res, next){
  let rows = await model_paket.getAll();
 res.render('paket/create',{
  data: rows,
 })
})
router.post('/store', async function(req, res, next){
  try {
      let { nama_paket, deskripsi, harga, id_wisata } = req.body;
      let data = {
          nama_paket,
          deskripsi,
          harga,
          id_wisata
      };
      await ModelPaket.create(data);
      req.flash('success', 'Berhasil menyimpan data');
      res.redirect('/admin/paket'); 
  } catch (error) {
      console.error(error);
      req.flash('error', 'Gagal menyimpan data');
      res.redirect('/admin/paket');
  }
});



router.get('/edit/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let paket = await ModelPaket.getById(id);
        let wisataList = await ModelPaket.getAllWisata();
        if (paket) {
            res.render('paket/edit', {
                data: paket,
                idWisataList: wisataList
            });
        } else {
            req.flash('error', 'Data paket tidak ditemukan');
            res.redirect('/paket');
        }
    } catch (error) {
        console.error(error);
        req.flash('error', 'Internal server error');
        res.redirect('/paket');
    }
});

router.post('/update/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let { nama_paket, deskripsi, harga, id_wisata } = req.body;
        let data = {
            nama_paket,
            deskripsi,
            harga,
            id_wisata
        };
        let result = await ModelPaket.update(id, data);
        if (result > 0) {
            req.flash('success', 'Berhasil update data');
        } else {
            req.flash('error', 'Data paket tidak ditemukan');
        }
        res.redirect('/paket');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Internal server error');
        res.redirect('/paket');
    }
});

router.get('/delete/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let paket = await ModelPaket.getById(id);
        if (paket) {
            let result = await ModelPaket.remove(id);
            if (result > 0) {
                req.flash('success', 'Berhasil menghapus data');
            } else {
                req.flash('error', 'Data paket tidak ditemukan');
            }
        } else {
            req.flash('error', 'Data paket tidak ditemukan');
        }
        res.redirect('/paket');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Internal server error');
        res.redirect('/paket');
    }
});

module.exports = router;
