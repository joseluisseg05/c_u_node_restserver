const path  = require('path');
const { v4: uuidv4 } = require('uuid');
const { response } = require('express');

const cargarArchivo = async (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({
            msj: 'No hay archivos para subir'
        });
        return;
    }

    const { archivo } = req.files;
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[ nombreCortado.length - 1 ];

    //valaiar extension 
    const extencionesVali = ['png', 'jpg', 'jpeg', 'gif'];
    
    if ( !extencionesVali.includes(extension) )
        return res.status(400).json({
            msj: "Tipo de archivo no valido"
        })

    const nombreTemp = uuidv4() + '.' + extension;
    const uploadPath = path.join(__dirname, '../uploads/', nombreTemp);

    archivo.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({
                err
            });
        }

        res.json({
            msj: "Archivo subido a "+ uploadPath
        })
    });
}


module.exports = {
    cargarArchivo,
}