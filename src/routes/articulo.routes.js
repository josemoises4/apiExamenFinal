const express = require('express');
const router = express.Router();
const Articulo = require('../model/Articulo');

router.post('/', async (req, res) => {
  try {
    const { titulo, contenido, categoria_id, usuario_id } = req.body;

    if (!titulo || !contenido || !categoria_id || !usuario_id) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const nuevoArticulo = new Articulo({ titulo, contenido, categoria_id, usuario_id });
    await nuevoArticulo.save();

    res.status(201).json({ mensaje: "Artículo creado exitosamente" });
  } catch (error) {
    console.error("Error al crear artículo:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

router.get('/', async (req, res) => {
  try {
    const articulos = await Articulo.find();
    res.json(articulos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener artículos' });
  }
});

module.exports = router;
