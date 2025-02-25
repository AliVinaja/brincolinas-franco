const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Producto = sequelize.define('Producto', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    imagenes: {
      type: DataTypes.JSON,
      allowNull: true
    },
    dimensiones: {
      type: DataTypes.JSON,
      allowNull: true
    },
    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    disponible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categorias',
        key: 'id'
      }
    }
  }, {
    tableName: 'productos',
    timestamps: false
  });

  return Producto;
};
