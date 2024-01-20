const express = require('express');
const router = express.Router();
const Empleado = require('../model/empleado.model');

router.get('/', (req, res) => {
    Empleado.getList((err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

router.get('/:id', (req, res) => {
    Empleado.get(req.params.id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result[0]);
    }
  });
});

router.post('/', (req, res) => {
    Empleado.create(req.body, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Empleado created successfully' });
    }
  });
});

router.put('/:id', (req, res) => {
    Empleado.update(req.params.id, req.body, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Empleado updated successfully' });
    }
  });
});

router.delete('/:id', (req, res) => {
    Empleado.delete(req.params.id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Empleado deleted successfully' });
    }
  });
});

module.exports = router;