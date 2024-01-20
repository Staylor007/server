const express = require('express');
const router = express.Router();
const Reserva = require('../model/reserva.model');

router.get('/', (req, res) => {
    Reserva.getList((err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});
 
router.get('/user/:id', (req, res) => {
  Reserva.getIdUser(req.params.id, (err, result) => {
  if (err) {
    res.status(500).json({ error: err.message });
  } else {
    res.json(result);
  }
});
});

router.get('/:id', (req, res) => {
    Reserva.get(req.params.id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result[0]);
    }
  });
});

router.post('/', (req, res) => {
  MeReservanu.create(req.body, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Reserva created successfully' });
    }
  });
});

router.put('/:id', (req, res) => {
    Reserva.update(req.params.id, req.body, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Reserva updated successfully' });
    }
  });
});

router.put('/estado/:id', (req, res) => {
  Reserva.updateEstado(req.params.id, req.body, (err) => {
  if (err) {
    res.status(500).json({ error: err.message });
  } else {
    res.json({ message: 'Reserva updated successfully' });
  }
});
});

router.delete('/:id', (req, res) => {
    Reserva.delete(req.params.id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Reserva deleted successfully' });
    }
  });
});

module.exports = router;