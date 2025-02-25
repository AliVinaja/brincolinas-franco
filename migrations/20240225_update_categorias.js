'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Primero, eliminamos todas las categorías existentes
    await queryInterface.bulkDelete('categorias', null, {});

    // Insertamos las nuevas categorías
    const categorias = await queryInterface.bulkInsert('categorias', [
      { nombre: 'Brincolina sencilla' },
      { nombre: 'Brincolina resbaladero' },
      { nombre: 'Brincolina acuatica' },
      { nombre: 'Brincolina jumbo' },
      { nombre: 'Brincolina acuatica pequeña' },
      { nombre: 'Mesas' },
      { nombre: 'Sillas' },
      { nombre: 'Portacool' }
    ], { returning: true });

    // Actualizamos los productos existentes
    const [results, metadata] = await queryInterface.sequelize.query(`
      UPDATE productos 
      SET categoria_id = CASE
        WHEN nombre LIKE '%sencilla%' OR descripcion LIKE '%sencilla%' 
          THEN (SELECT id FROM categorias WHERE nombre = 'Brincolina sencilla')
        WHEN nombre LIKE '%resbaladero%' OR descripcion LIKE '%resbaladero%'
          THEN (SELECT id FROM categorias WHERE nombre = 'Brincolina resbaladero')
        WHEN (nombre LIKE '%acuatica%' OR descripcion LIKE '%acuatica%') AND (nombre NOT LIKE '%pequeña%' AND descripcion NOT LIKE '%pequeña%')
          THEN (SELECT id FROM categorias WHERE nombre = 'Brincolina acuatica')
        WHEN nombre LIKE '%jumbo%' OR descripcion LIKE '%jumbo%'
          THEN (SELECT id FROM categorias WHERE nombre = 'Brincolina jumbo')
        WHEN (nombre LIKE '%acuatica%' AND nombre LIKE '%pequeña%') OR (descripcion LIKE '%acuatica%' AND descripcion LIKE '%pequeña%')
          THEN (SELECT id FROM categorias WHERE nombre = 'Brincolina acuatica pequeña')
        WHEN nombre LIKE '%mesa%' OR descripcion LIKE '%mesa%'
          THEN (SELECT id FROM categorias WHERE nombre = 'Mesas')
        WHEN nombre LIKE '%silla%' OR descripcion LIKE '%silla%'
          THEN (SELECT id FROM categorias WHERE nombre = 'Sillas')
        WHEN nombre LIKE '%portacool%' OR descripcion LIKE '%portacool%'
          THEN (SELECT id FROM categorias WHERE nombre = 'Portacool')
      END
      WHERE categoria_id IS NOT NULL
    `);

    // Eliminamos los productos que no coinciden con ninguna categoría
    await queryInterface.sequelize.query(`
      DELETE FROM productos 
      WHERE categoria_id NOT IN (SELECT id FROM categorias)
    `);
  },

  async down(queryInterface, Sequelize) {
    // Si necesitas revertir los cambios
    await queryInterface.bulkDelete('categorias', null, {});
  }
};
