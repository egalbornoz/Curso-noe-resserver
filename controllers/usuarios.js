// para que el res funcione
const { response, request } = require('express');

/*   Se definen las funciones de rutas en el controller  */
const usuariosGet = (req = request, res = response) => {
    // Extraer parametros enviados del fronend

    const { q, nombre = 'no name', apiKey } = req.query;

    res.json({
        msg: 'get API - Controller',
        nombre,
        q, apiKey
    });
}

const usuariosPut = (req, res = response) => {
    const { id } = req.params; //Id configurado en la ruta router.put('/:id', usuariosPut);

    res.status(400).json({
        msg: 'Peticion put - Controller',
        id
    });
}

const usuariosPost = (req, res = response) => {
    // Capturo los datos que vienen del body
    const { nombre, edad } = req.body;
    res.status(201).json({
        msg: 'Peticion post - Controller',
        nombre,
        edad
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'Peticion delete - Controller'
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Peticion patch - Controller'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch

}