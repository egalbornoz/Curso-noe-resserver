const { response } = require('express');
const bcrypjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req, res = response) => {

    const { correo, contraseña } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });
        //Verificar si Email existe
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario y/o contraseña no son válidos - email'
            })
        }

        //Verificar estatus del usuario
        if (usuario.estado === false) {
            return res.status(400).json({
                msg: 'Usuario y/o contraseña no son válidos - estado '
            })
        }
        //Verificar la contraseña
        const validarPass = bcrypjs.compareSync(contraseña, usuario.contraseña);

        if (!validarPass) {
            return res.status(400).json({
                msg: 'Usuario y/o contraseña no son válidos  - valipass'
            })
        }
        // Generar JWT,
        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salio mal, comunicar al administrador'
        })
    }
}

module.exports = {
    login
}