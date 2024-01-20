// Reserva.model.js
const mysql = require('mysql2');
const dbConfig = require('../db.config');

const connection = mysql.createConnection(dbConfig);

connection.connect();
 
const Empleado = {
    getList: (callback) => {
      connection.query('SELECT * FROM empleado_bar', callback);
    },
    get: (id, callback) => {
      connection.query('SELECT * FROM empleado_bar WHERE id_empleado_bar = ?', [id], callback);
    },


    create: (newUser, callback) => {  
      const valores = [
        [newUser.id_bar,newUser.usuario,newUser.nombre,newUser.apellido,newUser.estado]
    ];

      connection.query('INSERT INTO empleado_bar (id_bar, usuario, nombre, apellido,estado) VALUES ?', [valores],(error, result) => {
        if (error) {
          callback(error, null);
          return;
        } else {
          connection.query('UPDATE usuario SET id_tipo_usuario = ? WHERE id_usuario = ?', [newUser.id_tipo_usuario, newUser.id_usuario], callback);
        }
         });  
    },

    update: (id, updatedUser, callback) => {
      connection.query('UPDATE empleado_bar SET ? WHERE id_empleado_bar = ?', [updatedUser, id], callback);
    },
    delete: (id, callback) => {
      connection.query('DELETE FROM empleado_bar WHERE id_empleado_bar = ?', [id], callback);
    },
};
  

module.exports =  Empleado;
 