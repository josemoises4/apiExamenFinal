const Categoria = require('../model/Categoria');

const agregar = async (datos) => {
    try {
        const nuevaCategoria = new Categoria(datos);
        await nuevaCategoria.save();
        return { mensaje: "Categoria agregado con éxito"}
    } catch (error) {
        return { error: error.message};
    }
}

const listar = async() => {
    try {
        return await Categoria.find();
    } catch (error) {
        return { error: error.message};
    }
}

module.exports = { agregar, listar};