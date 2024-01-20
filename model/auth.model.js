const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const dbConfig = require('../db.config');
const nodemailer = require('nodemailer');

const connection = mysql.createConnection(dbConfig);

connection.connect();

const secretKey = 'tu_clave_secreta'; // Cambia esto en un entorno de producción.

function loginUser(username, password, callback) {
  const query = 'SELECT us.*, tpu.nombre_tipo_usuario, emp.id_empleado_bar, emp.id_bar, emp.nombre, emp.apellido, emp.estado as estado_empleado, b.nombre_bar AS nombre_del_bar FROM usuario us JOIN tipo_usuario tpu ON us.id_tipo_usuario = tpu.id_tipo_usuario LEFT JOIN empleado_bar emp ON us.usuario = emp.usuario LEFT JOIN bar b ON emp.id_bar = b.id_bar WHERE us.usuario = ? AND us.contrasena = ?;';
  connection.query(query, [username, password], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    if (result.length > 0) {     
      const user = result[0];
      // No es necesario devolver la contraseña en la respuesta
      delete user.contrasena;
      // Generar un token JWT
      const token = jwt.sign({ userId: user.id_usuario, username: user.usuario, nombre_tipo_usuario: user.nombre_tipo_usuario ,id_tipo_usuario: user.id_tipo_usuario,id_bar: user.id_bar,nombre_bar:user.nombre_del_bar}, secretKey, { expiresIn: '1h' });
      // Devolver el token y la información del usuario
      const response = { success: true, token, user };
      callback(null, response);
    } else {
      // Usuario no autenticado
      const error = { success: false, message: 'Credenciales incorrectas' };
      callback(error, null);
    }
  });
}

function recoveryUser(email,origin, callback) {
  const baseUrl = origin
  // Verificar si el correo electrónico existe en la base de datos
  const query = 'SELECT * FROM usuario WHERE correo = ?';
  connection.query(query, [email], (err, result) => {
    if (err) {
      return callback(err, null);
    }

    if (result.length > 0) {
      const user = result[0];
      // Generar un token para recuperación de contraseña
      const resetToken = jwt.sign({ userId: user.id_usuario, email }, 'reset_secret', {
        expiresIn: '1h',
      });

      // Configurar nodemailer para el envío de correo electrónico
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'stalinec2002@gmail.com',
          pass: 'trtblavmzhnmtlmy',
        },
        tls: {
          rejectUnauthorized: false, // Aceptar certificados autofirmados
        },
      });

      // Configurar el contenido del correo electrónico
      const mailOptions = {
        from: 'stalinec2002@gmail.com',
        to: email,
        subject: 'Recuperación de Contraseña',
        html: `Haz clic en el siguiente enlace para restablecer tu contraseña: <a href="${baseUrl}/reset-password?token=${resetToken}">Restablecer Contraseña</a>`,
      };

      // Enviar el correo electrónico
      transporter.sendMail(mailOptions, (mailError, info) => {
        if (mailError) {
          console.error(mailError);
          return callback(mailError, null);        }

        // Devolver el token y la información del usuario
        const response = { success: true, message: 'Correo electrónico enviado con éxito' };
        callback(null, response);
      });
    } else {
      // Usuario no encontrado
      const error = { success: false, message: 'Correo electrónico no registrado' };
      callback(error, null);
    }
  });
}

function changePassword(userId, newPassword, callback) {
  const query = 'UPDATE usuario SET contrasena = ? WHERE id_usuario = ?';
  
  connection.query(query, [newPassword, userId], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    const response = { success: true, message: 'Contraseña cambiada con éxito' };
    callback(null, response);
  });
}



module.exports = {
  loginUser,
  recoveryUser,
  changePassword,
};