const express = require('express');
const router = express.Router();
const { User, registerUser } = require('../model/user.model');

// Ruta para el registro de usuario
router.post('/registro', async (req, res) => {
  try {
    const userData = req.body;
    console.log(userData)
    const registeredUser = await registerUser(userData);
    res.status(201).json(registeredUser);
  } catch (error) {
    console.error('Error durante el registro:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}); 


router.post('/', (req, res) => {
  User.create(req.body, (err) => {
  if (err) {
    res.status(500).json({ error: err.message });
  } else {
    res.status(201).json({ message: 'Usuario created successfully' });
  }
});
});


router.get('/', (req, res) => {
  User.getList((err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

router.get('/:id', (req, res) => {
  User.get(req.params.id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result[0]);
    }
  });
});
 

router.put('/:id', (req, res) => {
  User.update(req.params.id, req.body, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Usuario updated successfully' });
    }
  });
});

router.delete('/:id', (req, res) => {
  User.delete(req.params.id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Usuario deleted successfully' });
    }
  });
});


module.exports = router;