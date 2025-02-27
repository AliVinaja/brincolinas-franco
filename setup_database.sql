-- Eliminar la base de datos si existe
DROP DATABASE IF EXISTS brincolinas_franco;

-- Crear la base de datos
CREATE DATABASE brincolinas_franco;

-- Usar la base de datos
USE brincolinas_franco;

-- Crear tabla de categorías
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Crear tabla de productos
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    capacidad INT,
    imagenes JSON,
    dimensiones JSON,
    stock INT DEFAULT 1,
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Insertar las categorías
INSERT INTO categorias (nombre) VALUES
('Brincolina sencilla'),
('Brincolina resbaladero'),
('Brincolina acuatica'),
('Brincolina jumbo'),
('Brincolina acuatica pequeña'),
('Mesas'),
('Sillas'),
('Portacool');

-- Insertar productos
INSERT INTO productos (nombre, descripcion, precio, capacidad, imagenes, dimensiones, stock, categoria_id) VALUES
-- Brincolinas sencillas
('Brincolina Castillo', 'Brincolina sencilla en forma de castillo, perfecta para eventos pequeños', 500.00, 6, '[{"url":"https://picsum.photos/800/600"}, {"url":"https://picsum.photos/800/601"}]', '[{"alto": 2, "ancho": 3, "largo": 4}]', 2, 1),
('Brincolina Payaso', 'Brincolina sencilla temática de circo', 500.00, 6, '[{"url":"https://picsum.photos/800/602"}, {"url":"https://picsum.photos/800/603"}]', '[{"alto": 2, "ancho": 3, "largo": 4}]', 2, 1),

-- Brincolinas con resbaladero
('Brincolina Castillo con Resbaladero', 'Brincolina con resbaladero temática medieval', 800.00, 8, '[{"url":"https://picsum.photos/800/604"}, {"url":"https://picsum.photos/800/605"}]', '[{"alto": 3, "ancho": 4, "largo": 5}]', 2, 2),
('Brincolina Jungla con Resbaladero', 'Brincolina con resbaladero temática de selva', 800.00, 8, '[{"url":"https://picsum.photos/800/606"}, {"url":"https://picsum.photos/800/607"}]', '[{"alto": 3, "ancho": 4, "largo": 5}]', 1, 2),

-- Brincolinas acuáticas
('Brincolina Acuática Delfín', 'Gran brincolina acuática con temática marina', 1200.00, 12, '[{"url":"https://picsum.photos/800/608"}, {"url":"https://picsum.photos/800/609"}]', '[{"alto": 4, "ancho": 5, "largo": 6}]', 1, 3),
('Brincolina Acuática Tropical', 'Brincolina acuática con resbaladero y piscina', 1200.00, 12, '[{"url":"https://picsum.photos/800/610"}, {"url":"https://picsum.photos/800/611"}]', '[{"alto": 4, "ancho": 5, "largo": 6}]', 2, 3),

-- Brincolinas jumbo
('Brincolina Jumbo Aventura', 'Brincolina gigante con múltiples obstáculos', 1500.00, 15, '[{"url":"https://picsum.photos/800/612"}, {"url":"https://picsum.photos/800/613"}]', '[{"alto": 5, "ancho": 6, "largo": 7}]', 1, 4),
('Brincolina Jumbo Dinosaurio', 'Brincolina jumbo temática de dinosaurios', 1500.00, 15, '[{"url":"https://picsum.photos/800/614"}, {"url":"https://picsum.photos/800/615"}]', '[{"alto": 5, "ancho": 6, "largo": 7}]', 1, 4),

-- Brincolinas acuáticas pequeñas
('Mini Acuática Playa', 'Brincolina acuática pequeña ideal para niños pequeños', 700.00, 5, '[{"url":"https://picsum.photos/800/616"}, {"url":"https://picsum.photos/800/617"}]', '[{"alto": 2, "ancho": 3, "largo": 4}]', 2, 5),
('Mini Acuática Safari', 'Brincolina acuática pequeña con temática de safari', 700.00, 5, '[{"url":"https://picsum.photos/800/618"}, {"url":"https://picsum.photos/800/619"}]', '[{"alto": 2, "ancho": 3, "largo": 4}]', 1, 5),

-- Mesas
('Mesa Redonda', 'Mesa redonda para 10 personas', 50.00, 10, '[{"url":"https://picsum.photos/800/620"}, {"url":"https://picsum.photos/800/621"}]', '[{"alto": 1, "ancho": 2, "largo": 3}]', 10, 6),
('Mesa Rectangular', 'Mesa rectangular para 8 personas', 50.00, 8, '[{"url":"https://picsum.photos/800/622"}, {"url":"https://picsum.photos/800/623"}]', '[{"alto": 1, "ancho": 2, "largo": 3}]', 8, 6),

-- Sillas
('Silla Plegable', 'Silla plegable cómoda y resistente', 10.00, 1, '[{"url":"https://picsum.photos/800/624"}, {"url":"https://picsum.photos/800/625"}]', '[{"alto": 1, "ancho": 1, "largo": 1}]', 50, 7),
('Silla Infantil', 'Silla especial para niños', 8.00, 1, '[{"url":"https://picsum.photos/800/626"}, {"url":"https://picsum.photos/800/627"}]', '[{"alto": 1, "ancho": 1, "largo": 1}]', 30, 7),

-- Portacool
('Portacool Classic', 'Ventilador industrial portátil para eventos', 300.00, NULL, '[{"url":"https://picsum.photos/800/628"}, {"url":"https://picsum.photos/800/629"}]', '[{"alto": 2, "ancho": 2, "largo": 2}]', 4, 8),
('Portacool Deluxe', 'Ventilador industrial de alto rendimiento', 400.00, NULL, '[{"url":"https://picsum.photos/800/630"}, {"url":"https://picsum.photos/800/631"}]', '[{"alto": 2, "ancho": 2, "largo": 2}]', 3, 8);
