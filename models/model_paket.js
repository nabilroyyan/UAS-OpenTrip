const connection = require('../config/db');

class ModelPaket {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM paket', (err, rows) => {
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
      connection.query('SELECT * FROM paket WHERE id_paket = ?', id, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows[0]); // Ambil data pertama karena id_paket adalah primary key
        }
      });
    });
  }

  static async create(data) {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO paket SET ?', data, (err, result) => {
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
      connection.query('UPDATE paket SET ? WHERE id_paket = ?', [data, id], (err, result) => {
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
      connection.query('DELETE FROM paket WHERE id_paket = ?', id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.affectedRows); // Mengembalikan jumlah baris yang terpengaruh oleh perintah DELETE
        }
      });
    });
  }
}

module.exports = ModelPaket;
