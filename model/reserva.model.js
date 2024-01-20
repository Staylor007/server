// Reserva.model.js
const mysql = require('mysql2');
const dbConfig = require('../db.config');

const connection = mysql.createConnection(dbConfig);

connection.connect(); 

const Reserva = {
  getList: (callback) => {
    connection.query('SELECT re.id_reserva,re.id_usuario, me.id_bar,re.fecha_reserva,re.estado,re.codigo_estado,re.comentario FROM reserva re JOIN detalle_reserva dr ON  re.id_reserva = dr.id_reserva JOIN menu me ON dr.id_menu = me.id_menu ORDER BY fecha_reserva DESC', callback);
  },

  getIdUser: (id, callback) => {
    connection.query('SELECT * FROM reserva WHERE id_usuario = ? ORDER BY fecha_reserva DESC', [id], callback);
  }, 

  get: (id, callback) => {
    connection.query('SELECT * FROM reserva WHERE id_reserva = ?', [id], callback);
  },
  create: (newReserva, callback) => {
    connection.query('INSERT INTO reserva SET ?', newReserva, callback);
  },
  update: (id, updatedReserva, callback) => {
    connection.query('UPDATE reserva SET ? WHERE id_reserva = ?', [updatedReserva, id], callback);
  },

  updateEstado: (id, updatedReserva, callback) => {
    console.log(updatedReserva.estado)
    connection.query('UPDATE reserva SET estado = ? WHERE id_reserva = ?', [updatedReserva.estado, id], callback);
  },
 

  delete: (id, callback) => {
    // Eliminar detalles de la reserva
    connection.query('DELETE FROM detalle_reserva WHERE id_reserva = ?', [id], (error, result) => {
      if (error) {
        callback(error, null);
      } else {
        // Después de eliminar detalles, eliminar la reserva principal
        connection.query('DELETE FROM reserva WHERE id_reserva = ?', [id], callback);
      }
    });
  },
};

module.exports = Reserva;