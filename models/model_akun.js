const connection = require('../config/db');

class ModelAkun {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM akun ORDER BY id_akun DESC', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async getById(id) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM akun WHERE id_akun = ?', id, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows[0]);
        }
      });
    });
  }

  static async getByEmail(email) {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM akun WHERE email = ?', email, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows[0]); // Ambil data pertama karena email seharusnya unik
        }
      });
    });
  }

  static async create(data) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO akun SET ?', data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.insertId); // Mengembalikan ID dari data yang baru saja dimasukkan
        }
      });
    });
  }

  static async update(id, data) {
    return new Promise((resolve, reject) => {
      connection.query('UPDATE akun SET ? WHERE id_akun = ?', [data, id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows); // Mengembalikan jumlah baris yang terpengaruh oleh perintah UPDATE
        }
      });
    });
  }

  static async remove(id) {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM akun WHERE id_akun = ?', id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows); // Mengembalikan jumlah baris yang terpengaruh oleh perintah DELETE
        }
      });
    });
  }
}

module.exports = ModelAkun;
