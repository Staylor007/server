const express = require('express');
const router = express.Router();
const Menu = require('../model/menu.model');


const multer = require('multer'); // Agrega Multer para manejar archivos
 
// Configuración de Multer para guardar archivos en la carpeta 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });



router.get('/', (req, res) => {
  Menu.getList((err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

router.get('/:id', (req, res) => {
  Menu.get(req.params.id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result[0]);
    }
  });
});

router.post('/',upload.single('foto'), (req, res) => {
  const imagePath = req.file.path;
  req.body.foto = `${imagePath}`; 
  Menu.create(req.body, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Menu created successfully' });
    }
  });
});

router.put('/:id', upload.single('foto'),(req, res) => { 
  const imagePath = req.file ? req.file.path : null; 
  if (imagePath) {
    // Si hay una nueva imagen, actualizar con la nueva ruta
    req.body.foto = `${imagePath}`;
  }  
  Menu.update(req.params.id, req.body, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Menu updated successfully' });
    }
  });
});

router.delete('/:id', (req, res) => {
  Menu.delete(req.params.id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Menu deleted successfully' });
    }
  });
});

router.get('/bar/:id', (req, res) => {
  Menu.getListBar(req.params.id, (err, result) => {
    if (err) {
      console.error('Error in getListBar:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(result);
    }
  });
});

module.exports = router;