const path  = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = ( files, extencionesVali = ['png', 'jpg', 'jpeg', 'gif'], carpeta = "" ) => {
    //extenciones Validas los valores son por defecto si no se envian
    return new Promise( (resolve, reject) => {
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1 ];

        if ( !extencionesVali.includes(extension) )
            return reject( "Tipo de archivo no valido" );

        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }

            resolve(nombreTemp);
        });
    });
}

module.exports = {
    subirArchivo,
}