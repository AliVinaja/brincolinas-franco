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
    allowNull: false,
    unique: true
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  activa: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  orden: {
    type: DataTypes.INTEGER,
    defaultValue: 0
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
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  imagenes: {
    type: DataTypes.JSON,
    allowNull: true,
    validate: {
      isJSON(value) {
        if (typeof value !== 'object') {
          throw new Error('imagenes debe ser un JSON válido.');
        }
      }
    },
    get() {
      const rawValue = this.getDataValue('imagenes');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('imagenes', JSON.stringify(value));
    }
  },
  dimensiones: {
    type: DataTypes.JSON,
    allowNull: true,
    validate: {
      isJSON(value) {
        if (typeof value !== 'object') {
          throw new Error('dimensiones debe ser un JSON válido.');
        }
      }
    },
    get() {
      const rawValue = this.getDataValue('dimensiones');
      return rawValue ? JSON.parse(rawValue) : {};
    },
    set(value) {
      this.setDataValue('dimensiones', JSON.stringify(value));
    }
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  disponible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  categoriaId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'productos'
});

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'usuarios'
});

const CarritoUsuario = sequelize.define('CarritoUsuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firebaseUid: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  items: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: '[]',
    get() {
      const rawValue = this.getDataValue('items');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('items', JSON.stringify(value));
    }
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  tableName: 'carritos_usuario'
});

// Definir relaciones
Categoria.hasMany(Producto, { 
  foreignKey: 'categoriaId',
  as: 'productos'
});
Producto.belongsTo(Categoria, { 
  foreignKey: 'categoriaId',
  as: 'categoria'
});

module.exports = {
  sequelize,
  Categoria,
  Producto,
  Usuario,
  CarritoUsuario
};
