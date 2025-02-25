const mongoose = require('mongoose');

const rentaSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  productos: [{
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto',
      required: true
    },
    cantidad: {
      type: Number,
      required: true,
      min: [1, 'La cantidad debe ser al menos 1']
    },
    precioUnitario: {
      type: Number,
      required: true
    }
  }],
  fechaEntrega: {
    type: Date,
    required: true
  },
  horaEntrega: {
    type: String,
    required: true
  },
  duracion: {
    type: Number,
    required: true,
    min: [1, 'La duración debe ser al menos 1 hora']
  },
  direccionEntrega: {
    calle: String,
    numero: String,
    colonia: String,
    ciudad: String,
    estado: String,
    codigoPostal: String,
    referencias: String,
    coordenadas: {
      lat: Number,
      lng: Number
    }
  },
  estado: {
    type: String,
    enum: ['pendiente', 'confirmada', 'en-camino', 'entregada', 'recogida', 'cancelada'],
    default: 'pendiente'
  },
  total: {
    type: Number,
    required: true
  },
  anticipo: {
    type: Number,
    default: 0
  },
  notas: String,
  confirmacionWhatsApp: {
    enviada: {
      type: Boolean,
      default: false
    },
    fechaEnvio: Date
  }
}, {
  timestamps: true
});

// Middleware para actualizar el stock cuando se confirma una renta
rentaSchema.pre('save', async function(next) {
  if (this.isModified('estado') && this.estado === 'confirmada') {
    try {
      for (const item of this.productos) {
        const producto = await mongoose.model('Producto').findById(item.producto);
        producto.stock -= item.cantidad;
        await producto.save();
      }
    } catch (error) {
      next(error);
    }
  }
  next();
});

module.exports = mongoose.model('Renta', rentaSchema);
