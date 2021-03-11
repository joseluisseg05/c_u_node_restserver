
const { response } = require('express');
const { subirArchivo } = require('../helpers');

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


module.exports = {
    cargarArchivo,
}