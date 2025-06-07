const Usuario = require('../model/Usuario');

const agregar = async (datos) => {
    try {
        const nuevoUsuario = new Usuario(datos);
        await nuevoUsuario.save();
        return { mensaje: "Usuario agregado con éxito" };
    } catch (error) {
        return { error: error.message}
    }
}

const listar = async() => {
    try {
        return await Usuario.find();
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = { agregar, listar };