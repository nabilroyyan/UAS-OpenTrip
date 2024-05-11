var express = require('express');
const ModelAkun = require('../models/ModelAkun');
var router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    if (req.session.userId) {
      let id = req.session.userId;
      let akun = await ModelAkun.getById(id);
      if (akun) {
        if (akun.level !== 'user') {
          res.redirect('/logout');
        } else {
          res.render('users/index', {
            title: 'User Home',
            email: akun.email,
          });
        }
      } else {
        res.status(401).json({ error: 'User tidak ditemukan' });
      }
    } else {
      res.status(401).json('Butuh akses login');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});

router.get('/admin', async function (req, res, next) {
  try {
    if (req.session.userId) {
      let id = req.session.userId;
      let akun = await ModelAkun.getById(id);
      if (akun) {
        if (akun.level !== 'admin') {
          res.redirect('/logout');
        } else {
          res.render('users/admin', {
            title: 'Admin Home',
            email: akun.email,
          });
        }
      } else {
        res.status(401).json({ error: 'User tidak ditemukan' });
      }
    } else {
      res.status(401).json('Butuh akses login');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
});

module.exports = router;
