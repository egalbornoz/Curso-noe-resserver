/***************************************************************************
 *  Importaciones
 ****************************************************************************/
const path = require('path');
const fs = require('fs');
const { response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require('../models');
//Configuación de CLOUDINARY para el almacenamiento de imagenes  
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);
/***************************************************************************
 *  Contolador para carga de archivos
 ****************************************************************************/
cargarArchivos = async (req, res = response) => {

    try {
        //const nombre = await subirArchivo(req.files, ['txt', 'md'],'textos');
        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        res.json({ nombre });

    } catch (error) {
        res.status(400).json({ error })
    }
}
/***************************************************************************
 *  Contolador para actualizar imagen
 ****************************************************************************/
actualizarImagen = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvidor válidar esto' });
            break;
    }
    // Limpiar imagenes previas

    if (modelo.img) {
        //Borrar la imagen delservidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }
    }
    //Sube la imagen y guarda en DB
    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;

    await modelo.save();

    res.json(modelo);
}
/***************************************************************************
 *  Contolador para actualizar imagen  en Cloudinary
 ****************************************************************************/
actualizarImagenCloudinary = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvidor válidar esto' });
    }
    // Limpiar imagenes previas

    if (modelo.img) {
        //Obtener el nombre de la imagen o id del string
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1]
        const [public_id] = nombre.split('.');
        //Eliminar la imagen de claudinary
        cloudinary.uploader.destroy(public_id);

    }


    // //Sube la imagen y guarda en DB
    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    // // const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = secure_url;

    await modelo.save();

    res.json(modelo);
}
/***************************************************************************
 *  Contolador para servir imagenes a solicitudes http
 ****************************************************************************/
const mostrarImagen = async (req, res = response) => {

    const { id, coleccion } = req.params;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvidor válidar esto' });
            break;
    }
    // Limpiar imagenes previas

    if (modelo.img) {
        //Borrar la imagen delservidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
        if (fs.existsSync(pathImagen)) {
            //Retorna la imagen solicitada
            return res.sendFile(pathImagen);
        }
    }
    const pathImagen = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathImagen);
    // res.json({
    //     msg: `falta placeholder`
    // });

}

/***************************************************************************
 *  Exportaciones
 ****************************************************************************/
module.exports = {
    cargarArchivos,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary,
}