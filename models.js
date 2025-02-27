const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT || 3306,
  logging: false,
  define: {
    timestamps: false
  }
});

const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'categorias'
});

const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  imagenes: {
    type: DataTypes.JSON,
    allowNull: true,
    get() {
      const value = this.getDataValue('imagenes');
      return typeof value === 'string' ? JSON.parse(value) : value;
    },
    set(value) {
      this.setDataValue('imagenes', typeof value === 'string' ? value : JSON.stringify(value));
    }
  },
  dimensiones: {
    type: DataTypes.JSON,
    allowNull: true,
    get() {
      const value = this.getDataValue('dimensiones');
      return typeof value === 'string' ? JSON.parse(value) : value;
    },
    set(value) {
      this.setDataValue('dimensiones', typeof value === 'string' ? value : JSON.stringify(value));
    }
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Categoria,
      key: 'id'
    }
  }
}, {
  tableName: 'productos'
});

// Definir las relaciones
Categoria.hasMany(Producto, { foreignKey: 'categoria_id', as: 'productos' });
Producto.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'categoria' });

module.exports = {
  sequelize,
  Categoria,
  Producto
};
