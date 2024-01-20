// Reserva.model.js
const mysql = require('mysql2');
const dbConfig = require('../db.config');

const connection = mysql.createConnection(dbConfig);

connection.connect();

const DetReserva = {
  getList: (callback) => {
    connection.query('SELECT * FROM detalle_reserva', callback);
  },

  get: (id, callback) => {
    connection.query('SELECT * FROM detalle_reserva dp JOIN menu m ON dp.id_menu = m.id_menu WHERE dp.id_reserva = ?', [id], callback);
  },

  getdet: (id, callback) => {  
    connection.query('SELECT * FROM detalle_reserva dp JOIN menu m ON dp.id_menu = m.id_menu WHERE dp.id_reserva = ?', [id], callback);
  },


  create: (newPedido, callback) => {  
    let idReserva;
    const reservaValues = [
        [newPedido.id_usuario, newPedido.fecha_reserva, newPedido.estado, newPedido.codigo_estado,newPedido.comentario]
    ];

    connection.query('INSERT INTO reserva (id_usuario, fecha_reserva, estado, codigo_estado,comentario) VALUES ?', [reservaValues], (error, result) => {
       if (error) {
         callback(error, null);
         return;
       } else {
         idReserva = result.insertId;  
         const detalles = newPedido.detalles.map(detalle => [
           idReserva,
           detalle.id_menu,
           detalle.cantidad,
           detalle.precio_unitario,
           detalle.subtotal,
         ]);  
         connection.query('INSERT INTO detalle_reserva (id_reserva, id_menu, cantidad, precio_unitario, subtotal) VALUES ?', [detalles], (error, result) => {
           if (error) {
             callback(error, null);
           } else {
             callback(null, result);
           }
         });
       }
    });
  },

  update: (id, update, callback) => {
    connection.query('UPDATE detalle_reserva SET ? WHERE id_detalle_reserva = ?', [update, id], callback);
  },
  delete: (id, callback) => {
    connection.query('DELETE FROM detalle_reserva WHERE id_detalle_reserva = ?', [id], callback);
  },
};

module.exports = DetReserva;