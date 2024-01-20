// Reserva.model.js
const mysql = require('mysql2');
const dbConfig = require('../db.config');

const connection = mysql.createConnection(dbConfig);

connection.connect();

const Reserva = {
  
  getCiudad: (id, callback) => {
    connection.query('SELECT * FROM ciudad WHERE id_provincia = ?', [id], callback);
  },
  
  getProvincia: (id, callback) => {
    connection.query('SELECT * FROM provincia WHERE id_pais = ? ORDER BY nombre_provincia', [id], callback);

  },
  getPais: (callback) => {
    connection.query('SELECT * FROM pais', callback);
  },
  
};

module.exports = Reserva;