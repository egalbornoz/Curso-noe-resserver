// para que el res funcione
const { response, request, json } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
//const { validarCampos } = require('../middlewares/validar-campos');


/*   Se definen las funciones de rutas en el controller  */
const usuariosGet = async (req = request, res = response) => {
    // Extraer parametros enviados del fronend
    // const { q, nombre = 'no name', apiKey } = req.query;
    //limite = cantidad maxima de registros por pagina, desde = inciio de la paginacion
    const filtro = { estado: true };
    const { limite = 5, desde = 0 } = req.query;  //Obtener del body el limite de paginación

    //Para ejecutar promesas simultanes se usa un arreglo de promesas

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(filtro),
        Usuario.find(filtro) //dentro den find va la condicion
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async (req, res = response) => {
    const { id } = req.params; //Id configurado en la ruta router.put('/:id', usuariosPut);
    const { _id, contraseña, google, correo, ...resto } = req.body; // se excluyen elementos y el resto se actualiza
    if (contraseña) {
        const salt = bcrypt.genSaltSync();
        resto.contraseña = bcrypt.hashSync(contraseña, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const usuariosPost = async (req, res = response) => {
    // Capturo los datos que vienen del body
    const { nombre, correo, contraseña, rol } = req.body;
    // Se crea la inatancia del Schema Usuarios
    const usuario = new Usuario({ nombre, correo, contraseña, rol });

    const salt = bcrypt.genSaltSync();
    usuario.contraseña = bcrypt.hashSync(contraseña, salt);
    // Guardar en DB
    await usuario.save();
    res.json({
        msg: usuario
    });
}

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    const usuarioAut = req.usuario;

    res.json({ usuario, usuarioAut });
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