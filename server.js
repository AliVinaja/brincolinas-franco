const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { sequelize, Categoria, Producto, Usuario } = require('./models');
const bcrypt = require('bcrypt'); // Agregar bcrypt para comparar contraseñas
require('./config/firebase-admin');

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
const usuariosRouter = require('./routes/usuarios');
const cartRoutes = require('./routes/cart');

// Configurar rutas de API
app.use('/api/productos', productosRouter);
app.use('/api/categorias', categoriasRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/cart', cartRoutes);

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

    const usuarios = await Usuario.findAll();
    console.log(`👥 Usuarios encontrados: ${usuarios.length}`);
    
    console.log('✅ Modelos sincronizados correctamente');

    // Mostrar algunos datos de ejemplo para depuración
    if (productos.length > 0) {
      console.log('📝 Ejemplo de producto:', JSON.stringify(productos[0], null, 2));
    }
    if (categorias.length > 0) {
      console.log('📝 Ejemplo de categoría:', JSON.stringify(categorias[0], null, 2));
    }
  } catch (error) {
    console.error('❌ Error al inicializar base de datos:', error);
    throw error;
  }
};

// Agregar endpoint para el inicio de sesión
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos.' });
    }
    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos.' });
    }
    // Aquí puedes agregar lógica para generar un token o iniciar sesión
    res.status(200).json({ message: 'Inicio de sesión exitoso.' });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
});

// Inicializar base de datos y arrancar servidor
const PORT = process.env.PORT || 5000;

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch(error => {
  console.error('❌ Error al iniciar el servidor:', error);
  process.exit(1);
});
