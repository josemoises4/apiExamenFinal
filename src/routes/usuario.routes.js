const express = require("express");
const router = express.Router();
const { agregar, listar } = require("../service/UsuarioSERVICE");

// Ruta para listar usuarios
router.get("/", async (req, res) => {
    const usuarios = await listar();
    res.json(usuarios);
});

// Ruta para agregar un nuevo usuario
router.post("/", async (req, res) => {
    const resultado = await agregar(req.body);
    res.json(resultado);
});

module.exports = router;
