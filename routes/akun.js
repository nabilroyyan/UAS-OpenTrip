var express = require('express');
const ModelAkun = require('../models/ModelAkun');
var router = express.Router();

router.post('/register', async function (req, res, next) {
  try {
    const { email, password, notelp } = req.body; 
    if (!email || !password || !notelp) { 
      return res.status(400).json({ error: 'Email, password, and notelp are required' });
    }
    
    if (!(/^\d{11,12}$/).test(notelp)) {
      return res.status(400).json({ error: 'Notelp must be between 11 and 12 digits long' });
    }

    const existingAkun = await ModelAkun.getByEmail(email);
    if (existingAkun) {
      return res.status(400).json({ error: 'Email sudah digunakan' });
    }

    const newAkunId = await ModelAkun.create({ email, password, notelp });

    res.status(201).json({ message: 'Akun berhasil dibuat', akunId: newAkunId });
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});

router.post('/login', async function (req, res, next) {
  try {
    const { email, password } = req.body; 
    if (!email || !password) { 
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const akun = await ModelAkun.getByEmail(email);
    if (!akun) {
      return res.status(404).json({ error: 'Akun tidak ditemukan' });
    }

    if (akun.password !== password) {
      return res.status(401).json({ error: 'Password salah' });
    }

    res.status(200).json({ message: 'Login berhasil', akunId: akun.id_akun });
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});

module.exports = router;
