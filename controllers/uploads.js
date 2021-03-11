
const { response } = require('express');
const { subirArchivo } = require('../helpers');
const { Usuario, Producto } = require('../models');

const cargarArchivo = async (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({
            msj: 'No hay archivos para subir'
        });
        return;
    }
    
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

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;

    await modelo.save();

    res.json({
        modelo
    });
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
}