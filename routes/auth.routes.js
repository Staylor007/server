const express = require('express');
const authModel = require('../model/auth.model');
const jwt = require('jsonwebtoken');


const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  authModel.loginUser(username, password, (err, result) => {
    if (err) {
        console.error(err);
      res.status(500).json({ success: false, message: 'Error en el servidor' });
    } else {
      res.json(result);
    }
  });
});

router.post('/password-reset', (req, res) => {
  const email = req.body.email;
  const origin = req.body.origin 
  authModel.recoveryUser(email,origin, (err, result) => {
    if (err) {
        console.error(err);
      res.status(500).json({ success: false, message: 'Error en el servidor' });
    } else {
      res.json(result);
    }
  });
});
router.post('/reset-password', (req, res) => {
  const { token, newPassword } = req.body;
  // Verificar el token antes de realizar el cambio de contraseña
  try {
    // Decodificar el token para obtener el userId
    const decodedToken = jwt.verify(token, 'reset_secret');
    // Verificar si el usuario existe y realizar la actualización de la contraseña
    authModel.changePassword(decodedToken.userId, newPassword, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Token inválido' });
  }
});

module.exports = router;