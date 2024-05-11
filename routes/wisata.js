var express = require('express');
const ModelWisata = require('../models/ModelWisata');
var router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    let wisata = await ModelWisata.getAll();
    res.json(wisata);
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    let id = req.params.id;
    let wisata = await ModelWisata.getById(id);
    if (wisata) {
      res.json(wisata);
    } else {
      res.status(404).json({ error: 'Data wisata tidak ditemukan' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});

router.post('/', async function (req, res, next) {
  try {
    let data = req.body;
    let result = await ModelWisata.create(data);
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
    let result = await ModelWisata.update(id, data);
    if (result > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Data wisata tidak ditemukan' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    let id = req.params.id;
    let result = await ModelWisata.remove(id);
    if (result > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Data wisata tidak ditemukan' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});

module.exports = router;
