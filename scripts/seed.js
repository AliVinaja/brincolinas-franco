const mongoose = require('mongoose');
require('dotenv').config();
const Categoria = require('../models/Categoria');
const Producto = require('../models/Producto');

const categorias = [
  {
    nombre: 'Brincolines',
    descripcion: 'Brincolines inflables para fiestas y eventos',
    slug: 'brincolines'
  },
  {
    nombre: 'Mesas',
    descripcion: 'Mesas para eventos',
    slug: 'mesas'
  },
  {
    nombre: 'Sillas',
    descripcion: 'Sillas para eventos',
    slug: 'sillas'
  }
];

const productos = [
  // Brincolines
  {
    nombre: 'Brincolin Castillo',
    descripcion: 'Brincolin inflable en forma de castillo, perfecto para fiestas infantiles',
    precio: 500,
    dimensiones: {
      largo: 4,
      ancho: 4,
      alto: 3.5
    },
    capacidad: 6,
    stock: 2,
    imagenes: [
      {
        url: '/images/productos/brincolin-castillo.jpg',
        alt: 'Brincolin Castillo'
      }
    ]
  },
  {
    nombre: 'Brincolin Acuático',
    descripcion: 'Brincolin inflable con resbaladilla y alberca, ideal para días calurosos',
    precio: 800,
    dimensiones: {
      largo: 6,
      ancho: 4,
      alto: 3
    },
    capacidad: 8,
    stock: 1,
    imagenes: [
      {
        url: '/images/productos/brincolin-acuatico.jpg',
        alt: 'Brincolin Acuático'
      }
    ]
  },
  // Mesas
  {
    nombre: 'Mesa Redonda',
    descripcion: 'Mesa redonda para 10 personas, ideal para eventos',
    precio: 100,
    dimensiones: {
      largo: 1.5,
      ancho: 1.5,
      alto: 0.75
    },
    capacidad: 10,
    stock: 20,
    imagenes: [
      {
        url: '/images/productos/mesa-redonda.jpg',
        alt: 'Mesa Redonda'
      }
    ]
  },
  {
    nombre: 'Mesa Rectangular',
    descripcion: 'Mesa rectangular para 8 personas, perfecta para eventos formales',
    precio: 120,
    dimensiones: {
      largo: 2.4,
      ancho: 0.9,
      alto: 0.75
    },
    capacidad: 8,
    stock: 15,
    imagenes: [
      {
        url: '/images/productos/mesa-rectangular.jpg',
        alt: 'Mesa Rectangular'
      }
    ]
  },
  // Sillas
  {
    nombre: 'Silla Plegable',
    descripcion: 'Silla plegable cómoda y resistente',
    precio: 20,
    dimensiones: {
      largo: 0.44,
      ancho: 0.44,
      alto: 0.88
    },
    capacidad: 1,
    stock: 100,
    imagenes: [
      {
        url: '/images/productos/silla-plegable.jpg',
        alt: 'Silla Plegable'
      }
    ]
  },
  {
    nombre: 'Silla Tiffany',
    descripcion: 'Silla elegante estilo Tiffany para eventos formales',
    precio: 35,
    dimensiones: {
      largo: 0.45,
      ancho: 0.45,
      alto: 0.92
    },
    capacidad: 1,
    stock: 50,
    imagenes: [
      {
        url: '/images/productos/silla-tiffany.jpg',
        alt: 'Silla Tiffany'
      }
    ]
  }
];

async function seedDatabase() {
  try {
    // Conectar a la base de datos
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');

    // Limpiar la base de datos
    await Categoria.deleteMany({});
    await Producto.deleteMany({});
    console.log('Base de datos limpiada');

    // Crear categorías
    const categoriasCreadas = await Categoria.insertMany(categorias);
    console.log('Categorías creadas');

    // Asignar categorías a productos
    const productosConCategoria = productos.map(producto => {
      let categoria;
      if (producto.nombre.toLowerCase().includes('brincolin')) {
        categoria = categoriasCreadas.find(cat => cat.nombre === 'Brincolines')._id;
      } else if (producto.nombre.toLowerCase().includes('mesa')) {
        categoria = categoriasCreadas.find(cat => cat.nombre === 'Mesas')._id;
      } else if (producto.nombre.toLowerCase().includes('silla')) {
        categoria = categoriasCreadas.find(cat => cat.nombre === 'Sillas')._id;
      }
      return { ...producto, categoria };
    });

    // Crear productos
    await Producto.insertMany(productosConCategoria);
    console.log('Productos creados');

    console.log('Base de datos poblada exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
    process.exit(1);
  }
}

seedDatabase();
