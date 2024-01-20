// Reserva.model.js
const mysql = require('mysql2');
const dbConfig = require('../db.config');

const connection = mysql.createConnection(dbConfig);

connection.connect();

function registerUser(userData) {
  console.log(userData);
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO usuario SET ?';
    connection.query(query, userData, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

const User = {
    getList: (callback) => {
      connection.query('SELECT * FROM usuario', callback);
    },
    get: (id, callback) => {
      connection.query('SELECT * FROM usuario WHERE id_usuario = ?', [id], callback);
    },
    create: (newUser, callback) => {
      connection.query('INSERT INTO usuario SET ?', newUser, callback);
    },
    update: (id, updatedUser, callback) => {
      connection.query('UPDATE usuario SET ? WHERE id_usuario = ?', [updatedUser, id], callback);
    },
    delete: (id, callback) => {
      connection.query('DELETE FROM usuario WHERE id_usuario = ?', [id], callback);
    },
};
  

module.exports = {
  registerUser,
  User,
};
 