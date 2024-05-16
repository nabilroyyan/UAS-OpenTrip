var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const Model_Akun = require("../models/model_akun");

// GET home page
router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

// GET register page
router.get("/register", function (req, res) {
  res.render("auth/register");
});
// GET login page
router.get("/login", function (req, res) {
  res.render("auth/login");
});
router.get("/paket", function (req, res) {
  res.render("paket");
});
router.get("/detailpaket", function (req, res, next) {
  res.render("paket/detailpaket");
});

// POST register user
router.post("/saveusers", async (req, res) => {
  try {
    const { email, password, level, notelp } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const userData = {
      email,
      password: encryptedPassword,
      level,
      notelp,
    };
    await Model_Akun.create(userData);
    req.flash("success", "Berhasil register");
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    req.flash("error", "Gagal register");
    res.redirect("/register");
  }
});

// POST update user
router.post("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { notelp, email } = req.body;
    const data = { notelp, email };
    await Model_Akun.update(id, data);
    req.flash("success", "Berhasil mengubah data");
    res.redirect("/users");
  } catch (error) {
    console.error(error);
    req.flash("error", "Gagal menyimpan data");
    res.redirect("/users");
  }
});

// POST login user
router.post("/log", async (req, res) => {
  let { email, password } = req.body;
  try {
    let data = await Model_Akun.getByEmail(email);
    if (data.length > 0) {
      let encryptedPassword = data[0].password;
      let isPasswordMatch = await bcrypt.compare(password, encryptedPassword);
      if (isPasswordMatch) {
        req.session.userId = data[0].id_akun;
        if (data[0].level == 1) {
<<<<<<< HEAD
          req.flash('success', 'Berhasil login');
          res.redirect('/admin');

        } else if (data[0].level == 2) {
          req.flash('success', 'Berhasil login');
          res.redirect('/users');
        } else {
          res.redirect('/login');
=======
          res.redirect("/admin");
          req.flash("success", "Berhasil login");
          console.error(error);
        } else if (data[0].level == 2) {
          res.redirect("/users");
          req.flash("success", "Berhasil login");
          console.error(error);
        } else {
          res.redirect("/login");
          console.error(error);
>>>>>>> 8899a6f275d91d0349e4132d7088fbc8d3a1f294
        }
      } else {
        req.flash("error", "Email atau password salah");
        res.redirect("/login");
      }
    } else {
      req.flash("error", "Akun tidak ditemukan");
      res.redirect("/login");
    }
  } catch (error) {
    console.error(error);
    req.flash("error", "Error pada fungsi login");
    res.redirect("/login");
  }
});

// GET logout user
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.redirect("/users");
    } else {
      res.redirect("/login");
    }
  });
});

module.exports = router;
