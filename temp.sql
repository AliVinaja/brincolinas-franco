SET FOREIGN_KEY_CHECKS=0;

INSERT INTO categorias (id, nombre, descripcion, activa, orden, slug) VALUES 
(1, 'Brincolines Pequenos', 'Brincolines ideales para espacios reducidos', 1, 1, 'brincolines-pequenos'),
(2, 'Brincolines Medianos', 'Brincolines para fiestas medianas', 1, 2, 'brincolines-medianos');

INSERT INTO productos (id, nombre, descripcion, precio, imagenes, dimensiones, capacidad, disponible, stock, categoriaId) VALUES 
(1, 'Brincolin Castillo', 'Brincolin en forma de castillo medieval', 500.00, '[{"url":"/placeholder.png"}]', '{"largo":3,"ancho":3,"alto":4}', 6, 1, 2, 1),
(2, 'Brincolin Princesa', 'Brincolin rosa con tema de princesas', 600.00, '[{"url":"/placeholder.png"}]', '{"largo":4,"ancho":4,"alto":4}', 8, 1, 1, 1);

SET FOREIGN_KEY_CHECKS=1;
