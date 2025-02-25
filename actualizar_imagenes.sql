-- Actualizar productos con imágenes de ejemplo
UPDATE productos 
SET imagenes = '[{"url":"https://example.com/images/castillo-medieval.jpg"},{"url":"https://example.com/images/castillo-lateral.jpg"}]'
WHERE id = 1;

UPDATE productos 
SET imagenes = '[{"url":"https://example.com/images/princesa-castle.jpg"},{"url":"https://example.com/images/princesa-front.jpg"}]'
WHERE id = 2;

UPDATE productos 
SET imagenes = '[{"url":"https://example.com/images/dino-inflable.jpg"},{"url":"https://example.com/images/dino-slide.jpg"},{"url":"https://example.com/images/dino-detail.jpg"}]'
WHERE id = 3;

UPDATE productos 
SET imagenes = '[{"url":"https://example.com/images/water-castle.jpg"},{"url":"https://example.com/images/water-slide.jpg"},{"url":"https://example.com/images/water-pool.jpg"}]'
WHERE id = 4;

UPDATE productos 
SET imagenes = '[{"url":"https://example.com/images/super-heroes.jpg"},{"url":"https://example.com/images/heroes-inside.jpg"}]'
WHERE id = 5;

UPDATE productos 
SET imagenes = '[{"url":"https://example.com/images/mega-slide.jpg"},{"url":"https://example.com/images/slide-height.jpg"},{"url":"https://example.com/images/slide-front.jpg"}]'
WHERE id = 6;

UPDATE productos 
SET imagenes = '[{"url":"https://example.com/images/tropical-water.jpg"},{"url":"https://example.com/images/tropical-splash.jpg"}]'
WHERE id = 7;

UPDATE productos 
SET imagenes = '[{"url":"https://example.com/images/obstacle-course.jpg"},{"url":"https://example.com/images/obstacles.jpg"},{"url":"https://example.com/images/course-aerial.jpg"}]'
WHERE id = 8;

UPDATE productos 
SET imagenes = '[{"url":"https://example.com/images/mini-pool.jpg"},{"url":"https://example.com/images/mini-slide.jpg"}]'
WHERE id = 9;

UPDATE productos 
SET imagenes = '[{"url":"https://example.com/images/space-bounce.jpg"},{"url":"https://example.com/images/space-theme.jpg"},{"url":"https://example.com/images/space-interior.jpg"}]'
WHERE id = 10;
