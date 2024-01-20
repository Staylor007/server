const express = require('express');
const router = express.Router();
const ubicacionService = require('../model/ubicacion.model'); // Ajusta según tu estructura

router.get('/pais', (req, res) => {
    ubicacionService.getPais((err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(result);
      }
    });
  });

router.get('/provincia/:id', (req, res) => {
    ubicacionService.getProvincia(req.params.id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result);
    }
  });
});

router.get('/ciudad/:id', (req, res) => {
    ubicacionService.getCiudad(req.params.id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result);
    }
  });
});

module.exports = router;