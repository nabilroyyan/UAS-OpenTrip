var express = require('express');
const ModelPaket = require('../models/ModelPaket');
var router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    let paket = await ModelPaket.getAll();
    res.json(paket);
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});
router.get('/tambahpaket', async function (req, res, next) {
  try {
    let wisataList = await ModelWisata.getAll(); // Ambil data wisata dari database
    res.render('admin/tambahpaket', { idWisataList: wisataList }); // Render halaman tambahpaket.ejs dengan data wisata
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    let id = req.params.id;
    let paket = await ModelPaket.getById(id);
    if (paket) {
      res.json(paket);
    } else {
      res.status(404).json({ error: 'Data paket tidak ditemukan' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});

router.post('/', async function (req, res, next) {
  try {
    let data = req.body;
    let result = await ModelPaket.create(data);
    res.json({ id: result });
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    let id = req.params.id;
    let data = req.body;
    let result = await ModelPaket.update(id, data);
    if (result > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Data paket tidak ditemukan' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    let id = req.params.id;
    let result = await ModelPaket.remove(id);
    if (result > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Data paket tidak ditemukan' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});

module.exports = router;
