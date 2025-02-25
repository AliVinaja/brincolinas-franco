const formatearMensajeRenta = (renta, direccion) => {
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const productosFormateados = renta.productos
    .map(item => 
      `• ${item.producto.nombre}
   Cantidad: ${item.cantidad}
   Precio: $${item.precioUnitario}/hr
   Duración: ${renta.duracion} horas`
    )
    .join('\n\n');

  const direccionFormateada = `${direccion.calle} ${direccion.numero}
${direccion.colonia}
${direccion.ciudad}, ${direccion.estado}
CP: ${direccion.codigoPostal}
Referencias: ${direccion.referencias || 'No especificadas'}`;

  const mensaje = `¡Hola! Me gustaría rentar los siguientes productos:

${productosFormateados}

Fecha de entrega: ${formatearFecha(renta.fechaEntrega)}
Hora: ${renta.horaEntrega}
Duración total: ${renta.duracion} horas

Dirección de entrega:
${direccionFormateada}

Total a pagar: $${renta.total}

Por favor, confirma la disponibilidad y el proceso de pago. ¡Gracias!`;

  return mensaje;
};

const formatearMensajeConsulta = (producto) => {
  const mensaje = `¡Hola! Me interesa el siguiente producto:

${producto.nombre}

Me gustaría saber:
• Si está disponible
• Cuál es el proceso de renta
• Si hay algún requisito especial

¡Gracias!`;

  return mensaje;
};

const enviarMensajeWhatsApp = (mensaje, telefono) => {
  // Número de WhatsApp de la empresa (reemplazar con el número real)
  const numeroEmpresa = process.env.REACT_APP_WHATSAPP_NUMBER || '5212345678901';
  
  // Codificar el mensaje para la URL
  const mensajeCodificado = encodeURIComponent(mensaje);
  
  // Crear el enlace de WhatsApp
  const urlWhatsApp = `https://wa.me/${numeroEmpresa}?text=${mensajeCodificado}`;
  
  // Abrir WhatsApp en una nueva pestaña
  window.open(urlWhatsApp, '_blank');
};

const notificarRentaAdmin = async (renta) => {
  try {
    // Enviar notificación al administrador
    await fetch('/api/notificaciones/nueva-renta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(renta)
    });
  } catch (error) {
    console.error('Error al enviar notificación:', error);
  }
};

const confirmarRenta = async (rentaId) => {
  try {
    const response = await fetch(`/api/rentas/${rentaId}/confirmar`, {
      method: 'POST'
    });

    if (response.ok) {
      const renta = await response.json();
      // Enviar mensaje de confirmación al cliente
      const mensaje = `¡Hola! Tu renta ha sido confirmada:

Fecha: ${new Date(renta.fechaEntrega).toLocaleDateString('es-MX')}
Hora: ${renta.horaEntrega}
Total: $${renta.total}

Nos pondremos en contacto contigo antes de la entrega.
¡Gracias por tu preferencia!`;

      enviarMensajeWhatsApp(mensaje, renta.cliente.telefono);
    }
  } catch (error) {
    console.error('Error al confirmar renta:', error);
  }
};

export const whatsappService = {
  formatearMensajeRenta,
  formatearMensajeConsulta,
  enviarMensajeWhatsApp,
  notificarRentaAdmin,
  confirmarRenta
};
