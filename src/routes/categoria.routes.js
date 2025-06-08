// src/routes/categoria.routes.js
const express = require('express');
const router = express.Router();
const Categoria = require('../model/Categoria');

router.post("/", async (req, res) => {
  try {
    const { nombre } = req.body;

    // Evitar duplicados
    const existe = await Categoria.findOne({ nombre });
    if (existe) return res.status(400).json({ error: "La categoría ya existe." });

    const nueva = new Categoria({ nombre });
    await nueva.save();

    res.status(201).json({ mensaje: "Categoría creada correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la categoría." });
  }
});

// Obtener todas las categorías
router.get("/", async (req, res) => {
  try {
    const categorias = await Categoria.find({}, "nombre"); // Solo el campo nombre
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las categorías." });
  }
});

router.get('/nombre/:nombre', async (req, res) => {
  try {
    const categoria = await Categoria.findOne({ nombre: req.params.nombre });
    if (!categoria) return res.status(404).json({ error: "Categoría no encontrada" });
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

module.exports = router;
