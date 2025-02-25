const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { sequelize, Categoria, Producto } = require('./models');

const app = express();

// Middleware de logging
app.use((req, res, next) => {
  console.log(`📡 ${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar rutas
const productosRouter = require('./routes/productos');
const categoriasRouter = require('./routes/categorias');

// Configurar rutas de API
app.use('/api/productos', productosRouter);
app.use('/api/categorias', categoriasRouter);

// Servir archivos estáticos desde la carpeta build
app.use(express.static(path.join(__dirname, 'client/build')));

// Ruta catch-all para SPA - debe ir después de las rutas de API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error('🚨 Error global:', err);
  res.status(500).json({ 
    message: '⚠️ Algo salió mal!', 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Error interno del servidor'
  });
});

// Verificar conexión y sincronizar modelos
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a MySQL establecida correctamente');
    
    // Mostrar las tablas existentes
    const [results] = await sequelize.query('SHOW TABLES');
    console.log('📊 Tablas en la base de datos:', results);

    // Mostrar algunos registros de ejemplo
    const productos = await Producto.findAll();
    console.log(`📦 Productos encontrados: ${productos.length}`);
    
    const categorias = await Categoria.findAll();
    console.log(`🏷️ Categorías encontradas: ${categorias.length}`);
    
    console.log('✅ Base de datos inicializada correctamente');
  } catch (error) {
    console.error('❌ Error al inicializar base de datos:', error);
    throw error;
  }
};

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch(error => {
    console.error('❌ Error al iniciar el servidor:', error);
  });
