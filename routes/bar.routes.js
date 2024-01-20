const express = require('express');
const router = express.Router();
const Bar = require('../model/bar.model');

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
    Bar.getList((err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

router.get('/:id', (req, res) => {
    Bar.get(req.params.id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result[0]);
    }
  });
});

router.post('/',  upload.single('imagen'), (req, res) => { 
  const imagePath = req.file.path;
  req.body.imagen = `${imagePath}`; 
    Bar.create(req.body, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Bar created successfully' });
    }
  });
});

router.put('/:id', upload.single('imagen'), (req, res) => {
  const imagePath = req.file ? req.file.path : null;

  if (imagePath) {
    // Si hay una nueva imagen, actualizar con la nueva ruta
    req.body.imagen = `${imagePath}`;
  }   
    Bar.update(req.params.id, req.body, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Bar updated successfully' });
    }
  });
});

router.delete('/:id', (req, res) => {
    Bar.delete(req.params.id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Bar deleted successfully' });
    }
  });
});

module.exports = router;