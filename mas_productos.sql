-- Agregar más categorías
INSERT INTO categorias (id, nombre, descripcion, activa, orden, slug) VALUES 
(3, 'Brincolines Grandes', 'Brincolines para eventos grandes y fiestas corporativas', 1, 3, 'brincolines-grandes'),
(4, 'Inflables Acuáticos', 'Brincolines y juegos con agua para días calurosos', 1, 4, 'inflables-acuaticos'),
(5, 'Inflables Temáticos', 'Brincolines con diseños especiales para fiestas temáticas', 1, 5, 'inflables-tematicos');

-- Agregar más productos
INSERT INTO productos (id, nombre, descripcion, precio, imagenes, dimensiones, capacidad, disponible, stock, categoriaId) VALUES 
(3, 'Brincolin Dinosaurio', 'Increíble brincolin con forma de T-Rex y tobogán', 800.00, '[{"url":"/placeholder.png"}]', '{"largo":6,"ancho":4,"alto":5}', 10, 1, 2, 5),
(4, 'Castillo Acuático', 'Brincolin con alberca y resbaladilla de agua', 1200.00, '[{"url":"/placeholder.png"}]', '{"largo":8,"ancho":6,"alto":4}', 12, 1, 1, 4),
(5, 'Brincolin Superhéroes', 'Brincolin temático de superhéroes con obstáculos', 700.00, '[{"url":"/placeholder.png"}]', '{"largo":5,"ancho":4,"alto":4}', 8, 1, 2, 5),
(6, 'Mega Tobogán', 'Tobogán inflable gigante de 6 metros', 1500.00, '[{"url":"/placeholder.png"}]', '{"largo":12,"ancho":3,"alto":6}', 2, 1, 1, 3),
(7, 'Inflable Acuático Tropical', 'Brincolin con temática tropical y chorros de agua', 900.00, '[{"url":"/placeholder.png"}]', '{"largo":6,"ancho":6,"alto":3}', 10, 1, 2, 4),
(8, 'Arena de Obstáculos', 'Circuito inflable con obstáculos y retos', 1000.00, '[{"url":"/placeholder.png"}]', '{"largo":10,"ancho":5,"alto":3}', 8, 1, 1, 3),
(9, 'Mini Splash', 'Pequeña alberca inflable con resbaladilla', 400.00, '[{"url":"/placeholder.png"}]', '{"largo":3,"ancho":2,"alto":2}', 4, 1, 3, 4),
(10, 'Brincolin Espacial', 'Brincolin con tema del espacio y planetas', 650.00, '[{"url":"/placeholder.png"}]', '{"largo":4,"ancho":4,"alto":4}', 6, 1, 2, 5);
