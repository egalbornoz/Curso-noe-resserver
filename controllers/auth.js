const { response, json } = require('express');
const bcrypjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

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
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            msg: 'Algo salio mal, comunicar al administrador'
        })
    }
}

const googleSigin = async (req, res = response) => {
    const { id_token } = req.body;
    try {
        const { correo, nombre, img } = await googleVerify(id_token);

        // Verificar que el correo no este registrado en la db

        let usuario = await Usuario.findOne({ correo });

        // //Si el Usuario válidado via google no existe, lo creo
        if (!usuario) {
            const data = {
                nombre,
                correo,
                contraseña: ':P',
                img,
                google: true
            };
            usuario = new Usuario(data);
            await usuario.save();
        }

        // // Si el usuario en Db esta en estado false(eliminado)

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador, Usuario bloqueado',
            });
        }
        // Generar JWT,
        const token = await generarJWT(usuario.id);



        res.json({
            usuario,
            token
        });


    } catch (error) {
        res.status(400).json({
            msg: 'Token de google no es válido'
        })
    }


}

module.exports = {
    login,
    googleSigin
}