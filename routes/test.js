const express = require('express');
const router = express.Router();
const Categoria = require('../models/Categoria');
const Producto = require('../models/Producto');

router.get('/check-data', async (req, res) => {
  try {
    const categorias = await Categoria.find({});
    const productos = await Producto.find({}).populate('categoria');
    
    res.json({
      categorias,
      productos
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
