const Articulo = require('../model/Articulo');

const agregar = async (datos) => {
    try {
        const nuevoArticulo = new Articulo(datos);
        await nuevoArticulo.save();
        return { mensaje: "Articulo publicado con éxito"}
    } catch (error) {
        return { error: error.message};
    }
}

const listar = async() => {
    try {
        return await Articulo.find();
    } catch (error) {
        return { error: error.message};
    }
}

module.exports = { agregar, listar};