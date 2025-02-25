const { Sequelize } = require('sequelize');

// Crear instancia de Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME || 'brincolinas_franco',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // Desactivar logging para producción
    dialectOptions: {
      charset: 'utf8mb4'
    }
  }
);

// Importar modelos
const CategoriaModel = require('./Categoria');
const ProductoModel = require('./Producto');
const UsuarioModel = require('./Usuario');

// Inicializar modelos
const Categoria = CategoriaModel(sequelize);
const Producto = ProductoModel(sequelize);
const Usuario = UsuarioModel(sequelize);

// Definir asociaciones
Producto.belongsTo(Categoria, {
  foreignKey: 'categoriaId',
  as: 'categoria'
});

Categoria.hasMany(Producto, {
  foreignKey: 'categoriaId',
  as: 'productos'
});

module.exports = {
  sequelize,
  Categoria,
  Producto,
  Usuario
};
