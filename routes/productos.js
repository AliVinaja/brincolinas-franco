const express = require('express');
const router = express.Router();
const { Categoria, Producto } = require('../models');
const { Op } = require('sequelize');

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    console.log('🔍 Buscando todos los productos...');
    
    // Mostrar la consulta SQL que se va a ejecutar
    const productos = await Producto.findAll({
      include: [{ 
        model: Categoria,
        as: 'categoria',
        attributes: ['id', 'nombre', 'slug']
      }],
      logging: console.log // Esto mostrará la consulta SQL
    });
    
    console.log(`✅ Se encontraron ${productos.length} productos`);
    if (productos.length > 0) {
      console.log('📝 Ejemplo de producto:', JSON.stringify(productos[0], null, 2));
    }
    
    res.json(productos);
  } catch (error) {
    console.error('❌ Error al obtener productos:', error);
    res.status(500).json({ message: 'Error al obtener productos', error: error.message });
  }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }
  try {
    console.log(`🔍 Buscando producto con ID ${id}...`);
    const producto = await Producto.findByPk(id, {
      include: [{ 
        model: Categoria,
        as: 'categoria',
        attributes: ['id', 'nombre', 'slug']
      }],
      logging: console.log // Esto mostrará la consulta SQL
    });
    
    if (!producto) {
      console.log(`❌ No se encontró el producto con ID ${id}`);
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    
    console.log('✅ Producto encontrado:', JSON.stringify(producto, null, 2));
    res.json(producto);
  } catch (error) {
    console.error('❌ Error al obtener producto:', error);
    res.status(500).json({ message: error.message });
  }
});

// Obtener productos por categoría
router.get('/categoria/:categoriaId', async (req, res) => {
  try {
    console.log(`🔍 Buscando productos por categoría ${req.params.categoriaId}...`);
    const productos = await Producto.findAll({
      where: { categoriaId: req.params.categoriaId },
      include: [{ 
        model: Categoria,
        as: 'categoria',
        attributes: ['id', 'nombre', 'slug']
      }]
    });
    console.log(`✅ Se encontraron ${productos.length} productos`);
    res.json(productos);
  } catch (error) {
    console.error('❌ Error al obtener productos por categoría:', error);
    res.status(500).json({ message: error.message });
  }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    console.log('🔍 Creando nuevo producto...');
    const { nombre, descripcion, precio, categoriaId, imagenes, dimensiones, capacidad, stock } = req.body;
    
    const producto = await Producto.create({
      nombre,
      descripcion,
      precio,
      categoriaId,
      imagenes,
      dimensiones,
      capacidad,
      stock
    });
    
    console.log('✅ Producto creado:', JSON.stringify(producto, null, 2));
    
    // Obtener el producto con la categoría incluida
    const productoConCategoria = await Producto.findByPk(producto.id, {
      include: [{ 
        model: Categoria,
        as: 'categoria',
        attributes: ['id', 'nombre', 'slug']
      }]
    });
    
    res.status(201).json(productoConCategoria);
  } catch (error) {
    console.error('❌ Error al crear producto:', error);
    res.status(500).json({ message: 'Error al crear producto', error: error.message });
  }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
  try {
    console.log(`🔍 Actualizando producto con ID ${req.params.id}...`);
    const id = parseInt(req.params.id, 10);
    const { nombre, descripcion, precio, categoriaId, imagenes, dimensiones, capacidad, stock } = req.body;

    const [updated] = await Producto.update({
      nombre,
      descripcion,
      precio,
      categoriaId,
      imagenes,
      dimensiones,
      capacidad,
      stock
    }, {
      where: { id }
    });

    if (updated === 0) {
      console.log(`❌ No se encontró el producto con ID ${id}`);
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const productoActualizado = await Producto.findByPk(id, {
      include: [{ 
        model: Categoria,
        as: 'categoria',
        attributes: ['id', 'nombre', 'slug']
      }]
    });
    
    console.log('✅ Producto actualizado:', JSON.stringify(productoActualizado, null, 2));
    res.json(productoActualizado);
  } catch (error) {
    console.error('❌ Error al actualizar producto:', error);
    res.status(500).json({ message: 'Error al actualizar producto', error: error.message });
  }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  try {
    console.log(`🔍 Eliminando producto con ID ${req.params.id}...`);
    const id = parseInt(req.params.id, 10);
    const deleted = await Producto.destroy({
      where: { id }
    });

    if (deleted === 0) {
      console.log(`❌ No se encontró el producto con ID ${id}`);
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    console.log('✅ Producto eliminado');
    res.status(204).send();
  } catch (error) {
    console.error('❌ Error al eliminar producto:', error);
    res.status(500).json({ message: 'Error al eliminar producto', error: error.message });
  }
});

module.exports = router;
