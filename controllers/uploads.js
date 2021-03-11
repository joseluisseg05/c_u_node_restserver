const path = require('path');
const fs = require('fs');

const { response } = require('express');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { subirArchivo } = require('../helpers');
const { Usuario, Producto } = require('../models');


const cargarArchivo = async (req, res = response) => {
    
    try {
        //por defecto son imagenes //undefined manda los valores por defecto 
        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        //const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');
        
        res.json({
            nombre
        })
    } catch (error) {
        res.status(401).json({
            error
        })
    }
    
}

const actualizarImagen = async (req, res = response) => {
    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if ( !modelo ) 
                return res.status(400).json({
                    msj: `No existe un usuario con el id ${id}`
                });
            break;
        
        case 'productos':
            modelo = await Producto.findById(id);
            if ( !modelo ) 
                return res.status(400).json({
                    msj: `No existe un producto con el id ${id}`
                });
            break;
        
        default: 
            return res.status(500).json({
                msj: 'falta validar esta parte'
            });
    }

    //limpiar img previa
    try {
        if ( modelo.img ) {
            const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img);
            if ( fs.existsSync(pathImg) ) //si existe la imagen 
                fs.unlinkSync( pathImg ); // borra el archivo
        }

    } catch (error) {
        
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;

    await modelo.save();

    res.json({
        modelo
    });
}

const actualizarImagenCloudinary = async (req, res = response) => {
    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if ( !modelo ) 
                return res.status(400).json({
                    msj: `No existe un usuario con el id ${id}`
                });
            break;
        
        case 'productos':
            modelo = await Producto.findById(id);
            if ( !modelo ) 
                return res.status(400).json({
                    msj: `No existe un producto con el id ${id}`
                });
            break;
        
        default: 
            return res.status(500).json({
                msj: 'falta validar esta parte'
            });
    }

    //limpiar img previa
 
    if ( modelo.img ) {
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [ public_id ] = nombre.split('.');

        cloudinary.uploader.destroy( public_id );
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

    modelo.img = secure_url;

    await modelo.save();

    res.json({
        modelo
    });
}

const mostrarImg = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if ( !modelo ) 
                return res.status(400).json({
                    msj: `No existe un usuario con el id ${id}`
                });
            break;
        
        case 'productos':
            modelo = await Producto.findById(id);
            if ( !modelo ) 
                return res.status(400).json({
                    msj: `No existe un producto con el id ${id}`
                });
            break;
        
        default: 
            return res.status(500).json({
                msj: 'falta validar esta parte'
            });
    }

    //limpiar img previa
   
    if ( modelo.img ) {
        const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if ( fs.existsSync(pathImg) ) //si existe la imagen 
            return res.sendFile( pathImg ); //devuelve la img
    }   

    const pathImg = path.join(__dirname, '../assets/no-image.jpg');
    return res.sendFile(pathImg);

    
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImg,
    actualizarImagenCloudinary,
}