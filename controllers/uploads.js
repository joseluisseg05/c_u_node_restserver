
const { response } = require('express');
const { subirArchivo } = require('../helpers')
const cargarArchivo = async (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({
            msj: 'No hay archivos para subir'
        });
        return;
    }
    
    //por defecto son imagenes
    const nombre = await subirArchivo(req.files)

    res.json({
        nombre
    })
    
}


module.exports = {
    cargarArchivo,
}