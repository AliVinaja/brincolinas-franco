const express = require('express');
const router = express.Router();
const { Usuario } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    console.log('🔍 Registrando nuevo usuario...');
    const { nombre, email, password } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      console.log('❌ El email ya está registrado');
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    const nuevoUsuario = await Usuario.create({ 
      nombre, 
      email, 
      password // El hash se genera automáticamente en el hook beforeCreate
    });

    console.log('✅ Usuario registrado exitosamente');
    // No enviar la contraseña en la respuesta
    const { password: _, ...usuarioSinPassword } = nuevoUsuario.toJSON();
    res.status(201).json(usuarioSinPassword);
  } catch (error) {
    console.error('❌ Error al registrar usuario:', error);
    res.status(400).json({ message: error.message });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  try {
    console.log('🔍 Intentando login...');
    const { email, password } = req.body;

    // Buscar usuario
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      console.log('❌ Usuario no encontrado');
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const passwordValida = await usuario.comparePassword(password);
    if (!passwordValida) {
      console.log('❌ Contraseña incorrecta');
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar token
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('✅ Login exitoso');
    res.json({
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });
  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ message: 'Error al procesar el login' });
  }
});

// Obtener perfil del usuario
router.get('/perfil', async (req, res) => {
  try {
    // Aquí deberías agregar middleware de autenticación
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findByPk(decodedToken.id);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const { password: _, ...usuarioSinPassword } = usuario.toJSON();
    res.json(usuarioSinPassword);
  } catch (error) {
    console.error('❌ Error al obtener perfil:', error);
    res.status(500).json({ message: 'Error al obtener perfil' });
  }
});

module.exports = router;
