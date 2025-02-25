const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { CarritoUsuario } = require('../models');

// Obtener carrito del usuario
router.get('/', verifyToken, async (req, res) => {
  try {
    const carrito = await CarritoUsuario.findOne({
      where: { firebaseUid: req.user.uid }
    });

    res.json({
      items: carrito ? JSON.parse(carrito.items) : []
    });
  } catch (error) {
    console.error('Error al obtener carrito:', error);
    res.status(500).json({ message: 'Error al obtener el carrito' });
  }
});

// Actualizar carrito
router.put('/', verifyToken, async (req, res) => {
  try {
    const { items } = req.body;
    
    await CarritoUsuario.upsert({
      firebaseUid: req.user.uid,
      items: JSON.stringify(items)
    });

    res.json({ message: 'Carrito actualizado' });
  } catch (error) {
    console.error('Error al actualizar carrito:', error);
    res.status(500).json({ message: 'Error al actualizar el carrito' });
  }
});

// Eliminar carrito
router.delete('/', verifyToken, async (req, res) => {
  try {
    await CarritoUsuario.destroy({
      where: { firebaseUid: req.user.uid }
    });

    res.json({ message: 'Carrito eliminado' });
  } catch (error) {
    console.error('Error al eliminar carrito:', error);
    res.status(500).json({ message: 'Error al eliminar el carrito' });
  }
});

module.exports = router;
