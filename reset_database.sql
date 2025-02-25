-- Eliminar todas las tablas excepto categorias y productos
DROP TABLE IF EXISTS carritos;
DROP TABLE IF EXISTS carritos_usuario;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS migrations;
DROP TABLE IF EXISTS sequelizemeta;

-- Eliminar todos los productos
DELETE FROM productos;

-- Eliminar todas las categorías
DELETE FROM categorias;

-- Insertar las nuevas categorías
INSERT INTO categorias (nombre) VALUES
('Brincolina sencilla'),
('Brincolina resbaladero'),
('Brincolina acuatica'),
('Brincolina jumbo'),
('Brincolina acuatica pequeña'),
('Mesas'),
('Sillas'),
('Portacool');
