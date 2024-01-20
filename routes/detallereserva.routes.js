const express = require('express');
const router = express.Router();
const DetReserva = require('../model/detreserva.model');

router.get('/', (req, res) => {
    DetReserva.getList((err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

router.get('/:id', (req, res) => {
    DetReserva.get(req.params.id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result);
    }
  });
});

router.get('/det/:id', (req, res) => {
  DetReserva.getdet(req.params.id, (err, result) => {
  if (err) {
    res.status(500).json({ error: err.message });
  } else {
    res.json(result);
  }
});
});

router.post('/', (req, res) => {
    DetReserva.create(req.body, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Reserva created successfully' });
    }
  });
});

router.put('/:id', (req, res) => {
    DetReserva.update(req.params.id, req.body, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Reserva updated successfully' });
    }
  });
});

router.delete('/:id', (req, res) => {
    DetReserva.delete(req.params.id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Reserva deleted successfully' });
    }
  });
});

module.exports = router;