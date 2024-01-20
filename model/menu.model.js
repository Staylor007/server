// menu.model.js
const mysql = require('mysql2');
const dbConfig = require('../db.config');

const connection = mysql.createConnection(dbConfig);

connection.connect();

const Menu = {
  getListBar: (id,callback) => {
    connection.query('SELECT * FROM menu WHERE id_bar = ?', [id], callback);
  },
  getList: (callback) => {
    connection.query('SELECT * FROM menu', callback);
  },
  get: (id, callback) => {
    connection.query('SELECT * FROM menu WHERE id_menu = ?', [id], callback);
  },
  create: (newMenu, callback) => {
    connection.query('INSERT INTO menu SET ?', newMenu, callback);
  },
  update: (id, updatedMenu, callback) => {
    connection.query('UPDATE menu SET ? WHERE id_menu = ?', [updatedMenu, id], callback);
  },
  delete: (id, callback) => {
    connection.query('DELETE FROM detalle_reserva WHERE id_menu = ?', [id], (error) => {
      if (error) {
        return callback(error);
      }  
      // Ahora que los registros relacionados se han eliminado, eliminar la fila en menu
      connection.query('DELETE FROM menu WHERE id_menu = ?', [id], callback);
    });  
  },
};

module.exports = Menu;