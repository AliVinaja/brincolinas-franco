const express = require('express');
const router = express.Router();
const { Categoria, Producto } = require('../models');

// Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    console.log('🔍 Buscando todas las categorías...');
    const categorias = await Categoria.findAll({
      include: [{
        model: Producto,
        as: 'productos',
        attributes: ['id', 'nombre']
      }]
    });
    console.log(`✅ Se encontraron ${categorias.length} categorías`);
    res.json(categorias);
  } catch (error) {
    console.error('❌ Error al obtener categorías:', error);
    res.status(500).json({ message: 'Error al obtener categorías', error: error.message });
  }
});

// Obtener una categoría por ID
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    console.log(`🔍 Buscando categoría con ID ${id}...`);
    const categoria = await Categoria.findByPk(id, {
      include: [{
        model: Producto,
        as: 'productos',
        attributes: ['id', 'nombre', 'descripcion', 'precio', 'imagenes', 'capacidad']
      }]
    });
    
    if (!categoria) {
      console.log(`❌ No se encontró la categoría con ID ${id}`);
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    
    console.log('✅ Categoría encontrada');
    res.json(categoria);
  } catch (error) {
    console.error('❌ Error al obtener categoría:', error);
    res.status(500).json({ message: 'Error al obtener categoría', error: error.message });
  }
});

// Crear una nueva categoría
router.post('/', async (req, res) => {
  try {
    console.log('🔍 Creando nueva categoría...');
    const { nombre, descripcion, orden } = req.body;
    
    const categoria = await Categoria.create({
      nombre,
      descripcion,
      orden: orden || 0
    });
    
    console.log('✅ Categoría creada');
    res.status(201).json(categoria);
  } catch (error) {
    console.error('❌ Error al crear categoría:', error);
    res.status(500).json({ message: 'Error al crear categoría', error: error.message });
  }
});

// Actualizar una categoría
router.put('/:id', async (req, res) => {
  try {
    console.log(`🔍 Actualizando categoría con ID ${req.params.id}...`);
    const { nombre, descripcion, orden, activa } = req.body;
    
    const [updated] = await Categoria.update({
      nombre,
      descripcion,
      orden,
      activa
    }, {
      where: { id: req.params.id }
    });
    
    if (updated === 0) {
      console.log(`❌ No se encontró la categoría con ID ${req.params.id}`);
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    
    const categoriaActualizada = await Categoria.findByPk(req.params.id);
    console.log('✅ Categoría actualizada');
    res.json(categoriaActualizada);
  } catch (error) {
    console.error('❌ Error al actualizar categoría:', error);
    res.status(500).json({ message: 'Error al actualizar categoría', error: error.message });
  }
});

// Eliminar una categoría
router.delete('/:id', async (req, res) => {
  try {
    console.log(`🔍 Eliminando categoría con ID ${req.params.id}...`);
    const deleted = await Categoria.destroy({
      where: { id: req.params.id }
    });
    
    if (deleted === 0) {
      console.log(`❌ No se encontró la categoría con ID ${req.params.id}`);
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    
    console.log('✅ Categoría eliminada');
    res.status(204).send();
  } catch (error) {
    console.error('❌ Error al eliminar categoría:', error);
    res.status(500).json({ message: 'Error al eliminar categoría', error: error.message });
  }
});

module.exports = router;
